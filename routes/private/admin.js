const express = require('express')
const controller = require('../../controllers/admin')
const passport = require('passport')
const adminAuthFailed = require('../../utilus/adminAuthFailed')
const router = express.Router()

router.get('/', passport.authenticate('admin-jwt', {
    session: false,
    failWithError: true
}), controller.getAll, adminAuthFailed)

router.post('/:id', passport.authenticate('admin-jwt', {
    session: false,
    failWithError: true
}), controller.create, adminAuthFailed)

router.delete('/:id', passport.authenticate('admin-jwt', {
    session: false,
    failWithError: true
}), controller.remove, adminAuthFailed)

module.exports = router