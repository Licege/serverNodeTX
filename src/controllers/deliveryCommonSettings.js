const { sequelize } = require('../models').init()
const CommonDeliveryRepo = require('../repositories/deliveryCommonSettings')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const settings = await CommonDeliveryRepo.all({})
        res.status(200).json(settings)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const settings = await CommonDeliveryRepo.findById(req.params.id)
        res.status(200).json(settings)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    const transaction = await sequelize.transaction();

    try {
        const settings = await CommonDeliveryRepo.create(req.body, transaction)
        await transaction.commit()
        res.status(200).json(settings)
    } catch (e) {
        await transaction.rollback()
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    const transaction = await sequelize.transaction()

    try {
        const where = { id: req.params.id }
        await CommonDeliveryRepo.update(where, req.body, transaction)
        await transaction.commit()

        const settings = await CommonDeliveryRepo.findById(req.params.id)
        res.status(200).json(settings)
    } catch (e) {
        await transaction.rollback()
        errorHandler(res, e)
    }
}