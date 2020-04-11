const express = require('express')
const passport = require('passport')
const upload = require('../middleware/upload')
const controller = require('../controllers/news')
const router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.post('/', upload.single('image'), controller.create)
router.patch('/:id', upload.single('image'), controller.update)
router.patch('/:id', controller.delete)

module.exports = router