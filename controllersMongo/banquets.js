const BanquetHall = require('../modelsMongo/BanquetHall')
const errorHandler = require('../src/utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const halls = await BanquetHall.find()
        res.status(200).json(halls)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.get = async function (req, res) {
    try {
        const hall = await BanquetHall.findOne({_id: req.params.id})
        res.status(200).json(hall)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    try {
        const hall = await new BanquetHall({
            title: req.body.title,
            description: req.body.description,
            phone: req.body.phone,
            capacity: req.body.capacity,
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getAll = async function (req, res) {
    try {

    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getAll = async function (req, res) {
    try {

    } catch (e) {
        errorHandler(res, e)
    }
}