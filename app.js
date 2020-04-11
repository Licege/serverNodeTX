const express = require('express')
const mongoose = require('mongoose');
const passport = require('passport')
const bodyParser = require('body-parser')

const adminRoutes = require('./routes/admin')
const authRoutes = require('./routes/auth')
const categoriesRouter = require('./routes/categories')
const contactsRoutes = require('./routes/contacts')
const deliveryRoutes = require('./routes/delivery')
const menuRoutes = require('./routes/menu')
const newsRoutes = require('./routes/news')
const vacanciesRoutes = require('./routes/vacancies')
const usersRoutes = require('./routes/users')

const keys = require('./config/keys')
const app = express()

mongoose.connect(keys.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
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
app.use('/api/menu', menuRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/vacancies', vacanciesRoutes)
app.use('/api/users', usersRoutes)


module.exports = app