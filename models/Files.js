const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fileSchema = new Schema({
    fieldName: {
        type: String,
        required: true
    },
    preview: {
        type: String,
        required: true
    },
    type: {
        type: String,
    }
})

module.exports = mongoose.model('file', fileSchema)