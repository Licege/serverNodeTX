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
    }
})

module.exports = mongoose.model('global-delivery-settings', globalSettingsSchema)