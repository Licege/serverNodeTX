const express = require('express')
const passport = require('passport')
const upload = require('../../middleware/upload')
const adminAuthFailed = require('../../utilus/adminAuthFailed')
const controller = require('../../controllers/promo')
const router = express.Router()

router.get('/', passport.authenticate('admin-jwt', {
    session: false,
    failWithError: true
}), controller.getAll, adminAuthFailed)

router.get('/:id', passport.authenticate('admin-jwt', {
    session: false,
    failWithError: true
}), controller.getById, adminAuthFailed)

router.post('/', passport.authenticate('admin-jwt', {
    session: false,
    failWithError: true
}), upload.single('image'), controller.create, adminAuthFailed)

router.patch('/:id', passport.authenticate('admin-jwt', {
    session: false,
    failWithError: true
}), upload.single('image'), controller.update, adminAuthFailed)

module.exports = router