const express = require('express')
const passport = require('passport')
const controller = require('../../controllers/profile')
const router = express.Router()

router.get('/', passport.authenticate('simple-jwt', {session: false}), controller.getMe)
router.get('/orders', passport.authenticate('simple-jwt', {session: false}), controller.getMyOrders)
router.put('/', passport.authenticate('simple-jwt', {session: false}), controller.updateMe)


module.exports = router