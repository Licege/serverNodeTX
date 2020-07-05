const express = require('express')
const controller = require('../../../controllers/Statistics/averageChecks')
const router = express.Router()

router.get('/', controller.get)

module.exports = router
