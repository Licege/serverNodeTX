const mongoose = require('mongoose')
const Schema = mongoose.Schema

const citySchema = new Schema({
    title: {
        type: String,
        required: true
    }
})

module.export = mongoose.model('cities', citySchema)