const { sequelize } = require('../models').init()
const UserRepo = require('../repositories/user')
const DeliveryRepo = require('../repositories/delivery')
const errorHandler = require('../utils/errorHandler')

module.exports.getMe = async function(req, res) {
    try {
        const me = await UserRepo.findById(req.user.id)
        res.status(200).json(me)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getMyOrders = async function(req, res) {
    try {
        const attributes = [
            'id',
            'name',
            'email',
            'phone',
            'address',
            'deliveryCost',
            'deliveryType',
            'paymentStatus',
            'paymentType',
            'sale',
            'price',
            'createdAt'
        ]

        console.log('userId:', req.user.id);
        const where = { userId: req.user.id }
        const deliveryOrders = await DeliveryRepo.all(where, {
            attributes,
            order: [['createdAt', 'DESC']]
        })

        res.status(200).json(deliveryOrders)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.updateMe = async function(req, res) {
    const transaction = await sequelize.transaction()

    try {
        const where = { id: req.user }
        const updatedProfile = await UserRepo.update(where, req.body, transaction)
        await transaction.commit()
        return res.status(200).json(updatedProfile)
    } catch (e) {
        await transaction.rollback()
        errorHandler(res, e)
    }
}