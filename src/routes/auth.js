const router = require('express').Router()
const passport = require('passport')
const RateLimit = require('express-rate-limit');
const auth = require('../controllers/auth');

const rateLimit = new RateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100
})

module.exports = () => {
  router
    .post('/api/auth/login', rateLimit, passport.authenticate('user-strategy'), auth.login)
    .use('/api/auth/logout', auth.logout)
    .post('/api/auth/registration', auth.register)

  return router;
}