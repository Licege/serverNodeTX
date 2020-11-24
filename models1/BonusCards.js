const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bonusCardsSchema = new Schema({
    card_number: {
        type: Number,
        required: true,
        unique: true
    },
    phone_number: {
        type: String,
        required: true,
        unique: true
    },
    bonus_count: {
        type: Number,
        default: 0
    },
    reserve_bonus: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 3
    },
    history: [
        
    ]
})

module.exports = mongoose.model('bonus-card', bonusCardsSchema)