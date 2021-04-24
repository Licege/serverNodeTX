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
    .post('/api/public/auth/login', rateLimit, passport.authenticate('local'), auth.login)
    .post('/api/public/auth/registration', auth.register)
    .post('/tst', auth.tst)

  return router;
}