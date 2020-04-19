const express = require('express')
const upload = require('../middleware/upload')
const uploadPDF = require('../middleware/uploadPDF')
const controller = require('../controllers/menu')
const router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', controller.getByCategory)
router.get('/dish/:id', controller.getById)
router.delete('/:id', controller.remove)
router.post('/', upload.single('image'), controller.create)
router.patch('/:id', upload.single('image'), controller.update)

router.post('/:id', uploadPDF.single('file'), controller.uploadPdf)

module.exports = router