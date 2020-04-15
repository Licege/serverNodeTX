const mongoose = require('mongoose')
const Schema = mongoose.Schema

const deliverySchema = new Schema({
    surname: {type: String},
    phone: {type: String},
    email: {type: String},
    payment_type: {type: String, required: true},
    delivery_type: {type: String, required: true},
    odd_money: {type: String},
    address: {
        city: {type: String, required: true},
        street: {type: String},
        house: {type: String},
        flat: {type: String},
        floor: {type: String},
        intercom: {type: String}
    },
    restaurant: {
        ref: 'restaurant',
        type: Schema.Types.ObjectId
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    time_delivery: {
        type: Date
    },
    create_at: {
        type: Date,
        default: Date.now
    },
    count_person: {type: Number},
    bonus_card: {type: Number},
    comment: {type: String},
    status: {
        type: Number,
        required: true,
        default: 0
    },
    payment_status: {
        type: Number,
        required: true,
        default: 0
    },
    list: [
        {
            dish_id: {
                type: Schema.Types.ObjectId,
                required: true
            },
            title: {
                type: String
            },
            count: {
                type: Number
            },
            cost: {
                type: Number
            }
        }
    ],
    delivery_cost: {type: Number},
    total_price: {type: Number}
})

module.exports = mongoose.model('delivery', deliverySchema)