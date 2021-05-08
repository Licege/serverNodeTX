const mongoose = require('mongoose')
const Schema = mongoose.Schema

const globalSettingsSchema = new Schema({
    is_delivery_working: {
        type: Boolean,
        required: true
    },
    phone_for_sms: {
        type: String,
        required: true
    },
    payment_type_cash: {
        type: Boolean,
        required: true
    },
    payment_type_cashless: {
        type: Boolean,
        required: true
    },
    payment_type_online: {
        type: Boolean,
        required: true
    },
    sale_for_pickup: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('global-delivery-settings', globalSettingsSchema)