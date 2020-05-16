const express = require('express')
const passport = require('passport')
const controller = require('../../controllers/orders')
const adminAuthFailed = require('../../utilus/adminAuthFailed')
const router = express.Router()

router.get('/', passport.authenticate('admin-jwt', {
    session: false,
    failWithError: true
}), controller.getAll, adminAuthFailed)

router.get('/:id', passport.authenticate('simple-jwt', {session: false}), controller.getById)

router.patch('/:id', passport.authenticate('admin-jwt', {
    session: false,
    failWithError: true
}), controller.update, adminAuthFailed)

router.delete('/:id', passport.authenticate('admin-jwt', {
    session: false,
    failWithError: true
}), controller.remove, adminAuthFailed)

module.exports = router