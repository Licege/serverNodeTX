const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
    title: {type: String, required: true},
    address: {
        ref: 'address',
        type: Schema.Types.ObjectId
    },
    contacts: {
        ref: 'contacts',
        type: Schema.Types.ObjectId
    },
    global_delivery_settings: {
        ref: 'global-delivery-settings',
        type: Schema.Types.ObjectId
    },
    common_delivery_settings: {
        ref: 'common-delivery-settings',
        type: Schema.Types.ObjectId
    },
    about: {type: String}
})

module.exports = mongoose.model('restaurant', restaurantSchema)