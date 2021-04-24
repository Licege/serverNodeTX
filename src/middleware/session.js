const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const { sequelize } = require('../models/index').init()

const { TRIXOLMA_SID, TRIXOLMA_BASE_DOMAIN } = process.env
const oneDay = 24 * 3600 * 1000;

const extendDefaultFields = (defaults, sessionData) => ({
  data: defaults.data,
  expires: defaults.expires,
  userId: sessionData.passport?.user?.id || null
})

const sequeliseStore = () =>
  new SequelizeStore({
    db: sequelize,
    table: 'Session',
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: oneDay,
    extendDefaultFields
  })

module.exports = ({ resave = true, saveUninitialized = false, rolling = true } = {}) =>
  session({
    secret: 'special secret field',
    store: sequeliseStore(),
    resave,
    saveUninitialized,
    key: TRIXOLMA_SID,
    rolling,
    cookie: {
      maxAge: oneDay,
      domain: TRIXOLMA_BASE_DOMAIN,
      expires: new Date(Date.now() + oneDay),
      originalMaxAge: oneDay
    },
    expires: new Date(Date.now() + oneDay)
  })