const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const Socket = require('socket.io')
const path = require('path')
const router = require('../routes/routes')

const authLocal = require('../lib/auth/auth-local')
const sessionMiddleware = require('../middleware/session')
const ensureAuthenticated = require('../middleware/ensureAuthenticated')
const { createDeliveryController } = require('../controllers/sockets/delivery');
/**/
// const privateKey = fs.readFileSync('../../certs/selfsigned.key')
// const certificate = fs.readFileSync('../../certs/selfsigned.crt')
// const credentials = {key: privateKey, cert: certificate}
/**/

const whitelist = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:9090',
  'http://pub.trixolma.localhost:3000',
  'http://dashboard.trixolma.localhost:3001'
]
const configureOrigin = (origin, callback) => {
  // callback(null, true)
  if (whitelist.indexOf(origin) !== -1) {
    callback(null, true)
  } else {
    callback(new Error('Not allowed by CORS'))
  }
}

const start = () => {
  const app = express()

  app.use(cookieParser(process.env.SECRET))

  const options = {
    setHeaders: (res, path, stat) => {
      res.set('Access-Control-Allow-Origin', '*')
      res.set('Access-Control-Allow-Methods', 'GET')
      res.set('Access-Control-Allow-Headers', 'Content-Type')
    }
  }
  app.use('/uploads', express.static('uploads', options))

  app.use(require('cors')({
    credentials: true,
    origin: configureOrigin
  }))

  // const socketServer = require('http').createServer(app)

  // socketServer.listen(+process.env.SOCKET_PORT || 9091)

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));

  app.use(require('morgan')('dev'))
  // app.use('/uploads', express.static('uploads', options))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  // app.use(bodyParser.json({
  //   limit: '10mb',
  //   type: [
  //     'json',
  //     'application/csp-report',
  //     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel',
  //     'application/x-www-form-urlencoded'
  //   ]
  // }))

  passport.use(
    'user-strategy',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      authLocal
    ),
  )

  // app.use((req, res, next) => {
  //   res.setHeader('Surrogate-Control', 'no-store');
  //   res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  //   res.setHeader('Pragma', 'no-cache');
  //   res.setHeader('Expires', '0');
  //   next();
  // });

  const session = sessionMiddleware({ rolling: true })

  app.use(session)
  app.use(passport.initialize())
  app.use(passport.session())

  // const io = require('socket.io')(socketServer, {
  //   cors: {
  //     origin: 'http://localhost:3000',
  //     methods: ['GET', 'POST']
  //   }
  // })

  // let connections = []
  //
  // io.on('connection', (socket) => {
  //   console.log('Connected to Socket!' + socket.id)
  //   connections.push(socket)
  //
  //   socket.on('event://send-delivery', async (data) => {
  //     const order = await createDeliveryController(JSON.parse(data))
  //     if (order.status === 201) {
  //       socket.broadcast.emit('event://get-delivery', JSON.stringify(order.data))
  //     } else {
  //       socket.emit('event://send-delivery-error', JSON.stringify(order))
  //     }
  //     socket.emit('event://send-delivery:status', JSON.stringify({status: order.status}))
  //   })
  //
  //   socket.on('disconnect', () => {
  //     connections.splice(connections.indexOf(socket), 1)
  //     console.log('Успешное отсоединение')
  //   })
  // })

  app.use('/api/private/*', ensureAuthenticated)

  app.use(router())
  // app.use(router(io))

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
  process.on('unhandledRejection', console.error)

  const server = app.listen(process.env.SERVICE_PORT || 9090, () => {
    console.log(`Service app listening at ${server.address().port}`)
  })

  return app
}

module.exports = start
