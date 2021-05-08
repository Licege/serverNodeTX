const Promos = require('../modelsMongo/Promo')
const errorHandler = require('../src/utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const query = {}
        if (req.query.status) {
            query.status = req.query.status
        }
        const promos = await Promos.find(query)
        res.status(200).json(promos)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const promo = await Promos.findOne({_id: req.params.id})
        res.status(200).json(promo)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    const promo = new Promos({
        title: req.body.title,
        short_description: req.body.short_description,
        description: req.body.description,
        status: req.body.status,
        imageSrc: req.file ? req.file.path : ''
    })
    try {
        await promo.save()
        res.status(201).json(promo)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    const updated = {
        title: req.body.title,
        short_description: req.body.short_description,
        description: req.body.description,
        status: req.body.status
    }

    if (req.file) {
        updated.imageSrc = req.file
    }
    try {
        const promo = await Promos.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(promo)
    } catch (e) {
        errorHandler(res, e)
    }
}
