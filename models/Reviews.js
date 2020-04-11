const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    rating: {
        type: Number,
        required: true
    },
    description: {type: String},
    create_at: {
        type: Date,
        default: new Date
    },
    imageSrc: {type: String, default: ''},
    status: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('reviews', reviewSchema)