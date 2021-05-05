const { sequelize } = require('../models').init()
const PromosRepo = require('../repositories/promo')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const where = {}
        if (req.query.status) {
            where.status = req.query.status
        }
        const promos = await PromosRepo.all(where)
        res.status(200).json(promos)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const promo = await PromosRepo.findById(req.params.id)
        res.status(200).json(promo)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    const transaction = await sequelize.transaction()

    const promoToCreate = {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        description: req.body.description,
        status: req.body.status,
        imageSrc: req.file ? req.file.path : ''
    }
    try {
        const promo = await PromosRepo.create(promoToCreate, transaction)
        await transaction.commit()
        res.status(201).json(promo)
    } catch (e) {
        await transaction.rollback()
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    const transaction = await sequelize.transaction()

    const promoToupdate = {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        description: req.body.description,
        status: req.body.status
    }

    if (req.file) {
        promoToupdate.imageSrc = req.file
    }

    const id = req.params.id
    const where = { id }
    try {
        await PromosRepo.update(where, promoToupdate, transaction)
        await transaction.commit()
        const promo = await PromosRepo.findById(id);
        res.status(200).json(promo)
    } catch (e) {
        await transaction.rollback()
        errorHandler(res, e)
    }
}
