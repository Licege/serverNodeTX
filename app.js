const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const path = require('path')
const router = require('./routes/routes')

const { createDeliveryController } = require('./controllers/sockets/delivery');
/**/
// const privateKey = fs.readFileSync('../../certs/selfsigned.key')
// const certificate = fs.readFileSync('../../certs/selfsigned.crt')
// const credentials = {key: privateKey, cert: certificate}
/**/
const keys = require('./config/keys')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)

server.listen(9091)

mongoose.connect(keys.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)
require('./middleware/adminPassport')(passport)

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
app.use(require('cors')())

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

app.use(router())

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
}

module.exports = app
