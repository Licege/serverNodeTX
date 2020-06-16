const express = require('express')
const controller = require('../controllers/file')
const router = express.Router()
const upload = require('../middleware/upload')

router.post('/', upload.array('files', 25), controller.uploadFile)

module.exports = router