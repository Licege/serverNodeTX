const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    tokenId: {type: String},
    role: {type: String}
})

module.exports = mongoose.model('token', TokenSchema)