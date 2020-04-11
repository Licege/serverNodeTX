const express = require('express')
const passport = require('passport')
const controller = require('../controllers/reviews')
const router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.post('/', passport.authenticate('simple-jwt', {session: false}), controller.create)
router.patch('/:id', passport.authenticate('simple-jwt', {session: false}), controller.update)
router.delete('/:id', passport.authenticate('simple-jwt', {session: false}), controller.remove)

module.exports = router