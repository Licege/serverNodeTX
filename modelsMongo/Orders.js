const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    order_date: {
        type: Date,
        required: true
    },
    count_person: {type: Number},
    comment: {type: String},
    create_at: {type: Date, default: new Date},
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    status: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('order', orderSchema)