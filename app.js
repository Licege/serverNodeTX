const express = require('express')
const mongoose = require('mongoose');
const passport = require('passport')
const bodyParser = require('body-parser')
/*const socket = require('socket.io')
const http = require('http')*/

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

const keys = require('./config/keys')
const app = express()
/*const server = http.Server(app)
const io = socket(server)*/

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

/*io.on('connection', (socket) => {
    console.log('Connected to Socket!' + socket.id)
    socket.on('updateDelivery', (Delivery) => {
        //контроллер
    })
})*/

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