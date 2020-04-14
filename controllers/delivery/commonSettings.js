const CommonDelivery = require('../../models/delivery/CommonSettings')
const errorHandler = require('../../utilus/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const settings = await CommonDelivery.find({})
        console.log(settings);
        res.status(200).json(settings)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const settings = await CommonDelivery.find({_id: req.params.id})
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