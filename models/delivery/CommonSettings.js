const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commonSettingsSchema = new Schema({
    city_id: {
        ref: 'cities',
        type: Schema.Types.ObjectId,
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

module.export = mongoose.model('common-delivery-settings', commonSettingsSchema)