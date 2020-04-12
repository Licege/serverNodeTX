const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addressSchema = new Schema({
    city: {
        ref: 'cities',
        type: Schema.Types.ObjectId
    },
    street: {type: String},
    house: {type: String},
    flat: {type: String},
    floor: {type: String},
    intercom: {type: String}
})

module.exports = mongoose.model('address', addressSchema)