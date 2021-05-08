const { sequelize } = require('../models').init()
const GlobalSettingsRepo = require('../repositories/deliveryGlobalSettings')
const errorHandler = require('../utils/errorHandler')

module.exports.get = async function (req, res) {
    try {
        const settings = await GlobalSettingsRepo.one({})
        res.status(200).json(settings)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    const transaction = await sequelize.transaction()

    try {
        const where = { id: req.params.id }
        await GlobalSettingsRepo.update(where, req.body, transaction)
        await transaction.commit()

        const settings = await GlobalSettingsRepo.findById(req.params.id)
        res.status(200).json(settings)
    } catch (e) {
        await transaction.rollback()
        errorHandler(res, e)
    }
}