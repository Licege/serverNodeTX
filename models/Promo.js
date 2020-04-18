const mongoose = require('mongoose')
const Schema = mongoose.Schema

const promoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    short_description: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: Number,
        default: 0
    },
    imageSrc: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('promo', promoSchema)