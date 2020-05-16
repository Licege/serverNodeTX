const express = require('express')
const controller = require('../../controllers/menu')
const router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', controller.getByCategory)
router.get('/dish/:id', controller.getById)

module.exports = router