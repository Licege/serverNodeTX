const express = require('express')
const upload = require('../middleware/upload')
const controller = require('../controllers/menu')
const router = express.Router()

router.get('/', controller.getAll)
router.get('/:categoryId', controller.getByCategoryId)
router.delete('/:id', controller.remove)
router.post('/', upload.single('image'), controller.create)
router.patch('/:id', upload.single('image'), controller.update)

module.exports = router