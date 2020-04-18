const express = require('express')
const mongoose = require('mongoose');
const passport = require('passport')
const bodyParser = require('body-parser')

const adminRoutes = require('./routes/admin')
const authRoutes = require('./routes/auth')
const categoriesRouter = require('./routes/categories')
const contactsRoutes = require('./routes/contacts')
const deliveryRoutes = require('./routes/delivery/delivery')
const deliveryCommonSettingsRoutes = require('./routes/delivery/commonSettings')
const deliveryGlobalSettingsRoutes = require('./routes/delivery/globalSettings')
const ordersRoutes = require('./routes/orders')
const promosRoutes = require('./routes/promos')
const menuRoutes = require('./routes/menu')
const newsRoutes = require('./routes/news')
const reviewsRoutes = require('./routes/reviews')
const vacanciesRoutes = require('./routes/vacancies')
const usersRoutes = require('./routes/users')

const keys = require('./config/keys')
const app = express()

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

app.use('/api/admin', adminRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/categories', categoriesRouter)
app.use('/api/contacts', contactsRoutes)
app.use('/api/delivery', deliveryRoutes)
app.use('/api/delivery-settings/common', deliveryCommonSettingsRoutes)
app.use('/api/delivery-settings/global', deliveryGlobalSettingsRoutes)
app.use('/api/orders', ordersRoutes)
app.use('/api/promos', promosRoutes)
app.use('/api/menu', menuRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/reviews', reviewsRoutes)
app.use('/api/vacancies', vacanciesRoutes)
app.use('/api/users', usersRoutes)


module.exports = app