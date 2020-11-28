const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    user_id: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        required: true
    }
})

module.exports = mongoose.model('admin', adminSchema)