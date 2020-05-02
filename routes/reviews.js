const express = require('express')
const passport = require('passport')
const controller = require('../controllers/reviews')
const adminAuthFailed = require('../utilus/adminAuthFailed')
const router = express.Router()

router.get('/public/', controller.publicGetAll)
router.get('/private/', passport.authenticate('admin-jwt', {session: false, failWithError: true}),
    controller.getAll, adminAuthFailed)
router.get('/public/:id', controller.getById)
router.get('/private/:id', passport.authenticate(['admin-jwt'], {session: false}), controller.getById)
router.post('/', passport.authenticate('simple-jwt', {session: false}), controller.create)
router.patch('/:id', passport.authenticate('simple-jwt', {session: false}), controller.update)
router.delete('/:id', passport.authenticate('simple-jwt', {session: false}), controller.remove)

module.exports = router