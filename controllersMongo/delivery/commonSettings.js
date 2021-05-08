const CommonDelivery = require('../../modelsMongo/delivery/CommonSettings')
const errorHandler = require('../../src/utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const settings = await CommonDelivery.find({})
        res.status(200).json(settings)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const settings = await CommonDelivery.findOne({_id: req.params.id})
        res.status(200).json(settings)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    try {
        const settings = await new CommonDelivery(req.body).save()
        res.status(200).json(settings)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    try {
        const settings = await CommonDelivery.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(settings)
    } catch (e) {
        errorHandler(res, e)
    }
}