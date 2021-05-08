const { sequelize } = require('../models').init()
const CategoryRepo = require('../repositories/category')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const categories = await CategoryRepo.all({})
        res.status(200).json(categories)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.get = async function(req, res) {
    try {
        const category = await CategoryRepo.findById(req.params.id)
        res.status(200).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    const transaction = await sequelize.transaction()

    try {
        await CategoryRepo.destroyById(req.params.id)
        await transaction.commit()
        res.status(200).json({
            message: 'Категория успешно удалена.'
        })
    } catch (e) {
        await transaction.rollback()
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    const transaction = await sequelize.transaction()

    try {
        const categoryToAdd = {
            title: req.body.title,
            titleEn: req.body.titleEn
        }

        const category = await CategoryRepo.create(categoryToAdd, transaction)
        await transaction.commit()
        res.status(200).json(category)
    } catch (e) {
        await transaction.rollback()
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    const { id } = req.params
    try {
        const where = { id }
        await CategoryRepo.update(where, req.body)

        const category = await CategoryRepo.findById(id)
        res.status(200).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
}

