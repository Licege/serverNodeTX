const express = require('express')
const controller = require('../../../controllers/delivery/delivery')
const router = express.Router()

router.post('/', controller.create)

module.exports = router