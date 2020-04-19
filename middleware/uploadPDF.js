const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'uploads/')
    },
    filename(req, file, callback) {
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        callback(null, `${date}`)
    }
})

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'application/pdf') {
        callback(null, true)
    } else {
        callback(null, false)
    }
}

const limits = {
    fileSize: 1024 * 1024 * 6
}

module.exports = multer({storage, fileFilter, limits})