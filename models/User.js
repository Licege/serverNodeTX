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
    birthday: {type: Date},
    address: {
        city: {type: String, required: true, default: 'Калининград'},
        street: {type: String},
        house: {type: String},
        flat: {type: String},
        floor: {type: String},
        intercom: {type: String}
    },
    reg_date: {type: Date, default: new Date},
    imageSrc: {type: String, default: ''}
})

module.exports = mongoose.model('users', userSchema)