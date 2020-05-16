const express = require('express')
const passport = require('passport')
const controller = require('../../controllers/users')
const adminAuthFailed = require('../../utilus/adminAuthFailed')
const router = express.Router()

router.get('/', passport.authenticate('admin-jwt', {
    session: false,
    failWithError: true
}), controller.getAll, adminAuthFailed)

router.get('/:id', passport.authenticate('admin-jwt', {
    session: false,
    failWithError: true
}), controller.getById, adminAuthFailed)

router.patch('/:id', passport.authenticate('admin-jwt', {
    session: false,
    failWithError: true
}), controller.update, adminAuthFailed)

module.exports = router