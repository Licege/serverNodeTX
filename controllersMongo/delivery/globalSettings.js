const GlobalSettings = require('../../modelsMongo/delivery/GlobalSettings')
const errorHandler = require('../../src/utils/errorHandler')

module.exports.get = async function (req, res) {
    try {
        const settings = await GlobalSettings.findOne({})
        res.status(200).json(settings)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    try {
        const settings = await GlobalSettings.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
            )
        res.status(200).json(settings)
    } catch (e) {
        errorHandler(res, e)
    }
}