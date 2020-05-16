const express = require('express')
const passport = require('passport')
const controller = require('../../controllers/categories')
const adminAuthFailed = require('../../utilus/adminAuthFailed')
const router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', controller.get)
router.post('/',
    passport.authenticate('admin-jwt', {session: false, failWithError: true}),
    controller.create, adminAuthFailed)
router.patch('/:id', passport.authenticate('admin-jwt', {session: false, failWithError: true}),
    controller.update, adminAuthFailed)
router.delete('/:id', passport.authenticate('admin-jwt', {session: false, failWithError: true}),
    controller.remove, adminAuthFailed)

module.exports = router