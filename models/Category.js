const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    title_en: {
        type: String,
        require: true,
        unique: true
    }
})

module.exports = mongoose.model('category', categorySchema)