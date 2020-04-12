const express = require('express')
const passport = require('passport')
const controller = require('../../controllers/delivery/commonSettings')
const adminAuthFailed = require('../../utilus/adminAuthFailed')
const router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.post('/:id', passport.authenticate('admin-jwt', {
    session: false,
    failWithError: true
}), controller.create, adminAuthFailed)
router.patch('/:id', passport.authenticate('admin-jwt', {
    session: false,
    failWithError: true
}), controller.update, adminAuthFailed)

module.exports = router