const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commonSettingsSchema = new Schema({
    city: {
        type: String,
        unique: true,
        required: true
    },
    price_for_delivery: {
        type: Number,
        required: true,
        default: 0
    },
    free_delivery: {
        type: Number,
        default: 0
    },
    is_delivery: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('common-delivery-settings', commonSettingsSchema)