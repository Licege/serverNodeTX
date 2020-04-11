const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactsSchema = new Schema ({
    vk: {
        type: String
    },
    fb: {
        type: String
    },
    tg: {
        type: String
    },
    inst: {
        type: String
    },
    google: {
        type: String
    },
    tw: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    }
})

module.exports = mongoose.model('contacts', contactsSchema)