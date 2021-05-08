const BanquetHallRepo = require('../repositories/banquetHall')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const halls = await BanquetHallRepo.all({})
        res.status(200).json(halls)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.get = async function (req, res) {
    try {
        const { id } = req.params

        const hall = await BanquetHallRepo.one(id)
        res.status(200).json(hall)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    try {
        // const hall = await new BanquetHall({
        //     title: req.body.title,
        //     description: req.body.description,
        //     phone: req.body.phone,
        //     capacity: req.body.capacity,
        // })
    } catch (e) {
        errorHandler(res, e)
    }
}