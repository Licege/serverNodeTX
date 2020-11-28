const { sequelize } = require('../models').init()
const GlobalSettingsRepo = require('../repositories/deliveryGlobalSettings')
const errorHandler = require('../utilus/errorHandler')

module.exports.get = async function (req, res) {
    try {
        const where = { id: req.params.id }
        const settings = await GlobalSettingsRepo.findById(where)
        res.status(200).json(settings)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    const transaction = await sequelize.transaction()

    try {
        const where = { id: req.params.id }
        const settings = await GlobalSettingsRepo.update(where, req.body, transaction)
        await transaction.commit()
        res.status(200).json(settings)
    } catch (e) {
        await transaction.rollback()
        errorHandler(res, e)
    }
}