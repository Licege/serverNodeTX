const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    short_description: {
        type: String
    },
    create_at: {
        type: Date,
        default: new Date,
        required: true
    },
    imageSrc: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('news', newsSchema)