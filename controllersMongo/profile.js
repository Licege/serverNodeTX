const Profile = require('../modelsMongo/User')
const Delivery = require('../modelsMongo/delivery/Delivery')
const errorHandler = require('../src/utils/errorHandler')

const parsedProfile = (data) => {
    const { password, _id, __v, reg_date, imageSrc, ...rest } = data._doc

    const fields = Object.keys(rest).reduce((acc, key) => ({ ...acc, [key]: rest[key] }), {})

    return {
        id: _id,
        ...fields,
        regDate: reg_date,
        avatar: imageSrc
    }
}

const parsedDeliveryOrders = (data) => {
    return data.map(order => {
        const { __v, _id, ...rest } = order._doc

        return {
            id: _id,
            ...rest
        }
    })
}

module.exports.getMe = async function(req, res) {
    try {
        const me = await Profile.findOne({ _id: req.user })
        res.status(200).json(parsedProfile(me))
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getMyOrders = async function(req, res) {
    try {
        const deliveryOrders = await Delivery.find({ user_id: req.user })
        res.status(200).json(parsedDeliveryOrders(deliveryOrders))
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.updateMe = async function(req, res) {
    try {
        const updatedProfile = await Profile.findOneAndUpdate(
            { _id: req.user },
            {$set: req.body},
            {new: true}
        )
        return res.status(200).json(updatedProfile)
    } catch (e) {
        errorHandler(res, e)
    }
}