const express = require('express')
const controller = require('../../controllers/categories')
const router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', controller.get)

module.exports = router