const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bodyParser = require('body-parser')
const Socket = require('socket.io')
const path = require('path')
const authRouter = require('./src/routes/auth')
const router = require('./src/routes/routes')

const authLocal = require('./src/lib/auth/auth-local')
const sessionMiddleware = require('./src/middleware/session')
const ensureAuthenticated = require('./src/middleware/ensureAuthenticated')
const { createDeliveryController } = require('./src/controllers/sockets/delivery');
/**/
// const privateKey = fs.readFileSync('../../certs/selfsigned.key')
// const certificate = fs.readFileSync('../../certs/selfsigned.crt')
// const credentials = {key: privateKey, cert: certificate}
/**/
const keys = require('./config/keys')
const app = express()
app.use(require('cors')())
const server = require('http').createServer(app)

server.listen(9091)

mongoose.connect(keys.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.log(error))

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// app.use(passport.initialize())
// require('./src/middleware/passport')(passport)
// require('./src/middleware/adminPassport')(passport)

app.use(require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({
    limit: '10mb',
    type: [
        'json',
        'application/csp-report',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel',
        'application/x-www-form-urlencoded'
    ]
}))

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    authLocal
  ),
)

const session = sessionMiddleware({ resave: false, saveUninitialized: true, rolling: true })

app.use(session)
app.use(passport.initialize())
app.use(passport.session())

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

connections = []

io.on('connection', (socket) => {
  console.log('Connected to Socket!' + socket.id)
  connections.push(socket)

  socket.on('event://send-delivery', async (data) => {
    const order = await createDeliveryController(JSON.parse(data))
    if (order.status === 201) {
      socket.broadcast.emit('event://get-delivery', JSON.stringify(order.data))
    } else {
      socket.emit('event://send-delivery-error', JSON.stringify(order))
    }
    socket.emit('event://send-delivery:status', JSON.stringify({status: order.status}))
  })

  socket.on('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1)
    console.log('Успешное отсоединение')
  })
})

app.use(authRouter())

app.use('/api/*', ensureAuthenticated)

app.use(router(io))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
}

app.use((err, res, next) => {
  if (err.name === 'Error') {
    console.error(err)
    return res.status(409).json({ msg: err.message })
  }
  return res.status(500).json({ msg: 'Internal server error' })
})
app.use((req, res) => {
  res.status(404).json({ msg: 'Not found' })
})
process.on('unhandledRejection', console.error);

module.exports = app
