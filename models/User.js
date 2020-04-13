const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    surname: {type: String},
    forename: {type: String},
    patronymic: {type: String},
    age: {type: Number},
    phone: {
        type: String,
        required: true,
        unique: true
    },
    card_number: {type: Number},
    birthday: {type: Date},
    address: {
        ref: 'address',
        type: Schema.Types.ObjectId
    },
    reg_date: {type: Date, default: new Date},
    imageSrc: {type: String, default: ''}
})

module.exports = mongoose.model('users', userSchema)