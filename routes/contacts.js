const express = require('express')
const password = require('passport')
const controller = require('../controllers/contacts')
const router = express.Router()

router.get('/', password.authenticate('simple-jwt', {session: false}), controller.get)
router.patch('/:id', controller.update)

module.exports = router