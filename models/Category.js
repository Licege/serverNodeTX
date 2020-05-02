const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    title_en: {
        type: String,
        required: true,
        unique: true
    },
    is_delivery: {
        type: Boolean,
        required: true,
        default: true
    }
})

module.exports = mongoose.model('category', categorySchema)