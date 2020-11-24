const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pdfMenuSchema = new Schema ({
    fileSrc: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('pdfMenu', pdfMenuSchema)