const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dishSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    weight: {
        type: Number,
        default: 0
    },
    cost: {
        type: Number,
        required: true
    },
    category_id: {
        ref: 'categories',
        type: Schema.Types.ObjectId
    },
    imageSrc: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('dishes', dishSchema)