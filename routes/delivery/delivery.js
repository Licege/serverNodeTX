const express = require('express')
const passport = require('passport')
const controller = require('../../controllers/delivery/delivery')
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
router.post('/', controller.create)

module.exports = router