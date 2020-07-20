const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
// const socket = require('socket.io')
//const http = require('http')

const adminPrivateRoutes = require('./routes/private/admin')
const authPrivateRoutes = require('./routes/private/auth')
const categoriesPrivateRouter = require('./routes/private/categories')
const contactsPrivateRoutes = require('./routes/private/contacts')
const deliveryPrivateRoutes = require('./routes/private/delivery/delivery')
const deliveryCommonSettingsPrivateRoutes = require('./routes/private/delivery/commonSettings')
const deliveryGlobalSettingsPrivateRoutes = require('./routes/private/delivery/globalSettings')
const ordersPrivateRoutes = require('./routes/private/orders')
const promosPrivateRoutes = require('./routes/private/promos')
const menuPrivateRoutes = require('./routes/private/menu')
const newsPrivateRoutes = require('./routes/private/news')
const reviewsPrivateRoutes = require('./routes/private/reviews')
const vacanciesPrivateRoutes = require('./routes/private/vacancies')
const usersPrivateRoutes = require('./routes/private/users')

const averageChecksPrivateRoutes = require('./routes/private/Statistics/averageChecks')


const authPublicRoutes = require('./routes/public/auth')
const categoriesPublicRouter = require('./routes/public/categories')
const contactsPublicRoutes = require('./routes/public/contacts')
const deliveryPublicRoutes = require('./routes/public/delivery/delivery')
const deliveryCommonSettingsPublicRoutes = require('./routes/public/delivery/commonSettings')
const deliveryGlobalSettingsPublicRoutes = require('./routes/public/delivery/globalSettings')
const ordersPublicRoutes = require('./routes/public/orders')
const promosPublicRoutes = require('./routes/public/promos')
const menuPublicRoutes = require('./routes/public/menu')
const newsPublicRoutes = require('./routes/public/news')
const reviewsPublicRoutes = require('./routes/public/reviews')
const vacanciesPublicRoutes = require('./routes/public/vacancies')

const filesRouter = require('./routes/files')

const {createDeliveryController} = require('./controllers/sockets/delivery');
/**/
// const privateKey = fs.readFileSync('../../certs/selfsigned.key')
// const certificate = fs.readFileSync('../../certs/selfsigned.crt')
// const credentials = {key: privateKey, cert: certificate}
/**/
const keys = require('./config/keys')
const app = express()
//const server = require('https').createServer(credentials, app)
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)

// app.use(function(req,resp,next){
//     if (req.headers['x-forwarded-proto'] === 'https') {
//         return resp.redirect(301, 'http://' + req.headers.host + '/');
//     } else {
//         return next();
//     }
// });

server.listen(9091)

mongoose.connect(keys.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)
require('./middleware/adminPassport')(passport)

app.use(require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
}

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
    })

    socket.on('disconnect', () => {
        connections.splice(connections.indexOf(socket), 1)
        console.log('Успешное отсоединение')
    })
})

{/* Private */}
app.use('/api/private/auth', authPrivateRoutes)
app.use('/api/private/admin', adminPrivateRoutes)
app.use('/api/private/categories', categoriesPrivateRouter)
app.use('/api/private/contacts', contactsPrivateRoutes)
app.use('/api/private/delivery', deliveryPrivateRoutes)
app.use('/api/private/delivery-settings/common', deliveryCommonSettingsPrivateRoutes)
app.use('/api/private/delivery-settings/global', deliveryGlobalSettingsPrivateRoutes)
app.use('/api/private/orders', ordersPrivateRoutes)
app.use('/api/private/promos', promosPrivateRoutes)
app.use('/api/private/menu', menuPrivateRoutes)
app.use('/api/private/news', newsPrivateRoutes)
app.use('/api/private/reviews', reviewsPrivateRoutes)
app.use('/api/private/vacancies', vacanciesPrivateRoutes)
app.use('/api/private/users', usersPrivateRoutes)

app.use('/api/private/statistics/average-checks', averageChecksPrivateRoutes)

{/* Public */}
app.use('/api/public/auth', authPublicRoutes)
app.use('/api/public/categories', categoriesPublicRouter)
app.use('/api/public/contacts', contactsPublicRoutes)
app.use('/api/public/delivery', deliveryPublicRoutes)
app.use('/api/public/delivery-settings/common', deliveryCommonSettingsPublicRoutes)
app.use('/api/public/delivery-settings/global', deliveryGlobalSettingsPublicRoutes)
app.use('/api/public/orders', ordersPublicRoutes)
app.use('/api/public/promos', promosPublicRoutes)
app.use('/api/public/menu', menuPublicRoutes)
app.use('/api/public/news', newsPublicRoutes)
app.use('/api/public/reviews', reviewsPublicRoutes)
app.use('/api/public/vacancies', vacanciesPublicRoutes)

app.use('/api/files', filesRouter)


module.exports = app
