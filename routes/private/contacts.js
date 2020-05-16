const express = require('express')
const passport = require('passport')
const controller = require('../../controllers/contacts')
const adminAuthFailed = require('../../utilus/adminAuthFailed')
const router = express.Router()

router.get('/', controller.get)
router.patch('/:id', passport.authenticate('admin-jwt', {
    session: false,
    failWithError: true
}), controller.update, adminAuthFailed)

module.exports = router