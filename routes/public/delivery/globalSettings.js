const express = require('express')
const controller = require('../../../controllers/delivery/globalSettings')
const router = express.Router()

router.get('/', controller.get)

module.exports = router