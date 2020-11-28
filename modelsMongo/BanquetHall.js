const mongoose = require('mongoose')
const Schema = mongoose.Schema

const banquetHallSchema = new Schema({
    phone: {type: String},
    capacity: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [
        {type: String, required: true}
    ]
})

module.exports = mongoose.model('banquetHall', banquetHallSchema)