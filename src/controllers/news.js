const { sequelize } = require('../models').init()
const NewsRepo = require('../repositories/news')
const handleError = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const news = await NewsRepo.all({})
        const totalCount = news.length
        res.status(200).json({
            news,
            totalCount
        })
    } catch (e) {
        handleError(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const news = await NewsRepo.findById(req.params.id)
        res.status(200).json(news)
    } catch (e) {
        handleError(res, e)
    }
}

module.exports.create = async function (req, res) {
    const transaction = await sequelize.transaction()
    const newsToAdd = {
        title: req.body.title,
        description: req.body.description,
        shortDescription: req.body.shortDescription,
        imageSrc: req.file ? req.file.path : ''
    }


    try {
        const news = await NewsRepo.create(newsToAdd, transaction)
        await transaction.commit()
        res.status(201).json(news)
    } catch (e) {
        await transaction.rollback()
        handleError(res, e)
    }
}

module.exports.update = async function (req, res) {
    const transaction = await sequelize.transaction()
    const newsToUpdate = {
        title: req.body.title,
        description: req.body.description,
        shortDescription: req.body.shortDescription,
    }

    if (req.file) {
        newsToUpdate.imageSrc = req.file.path
    }

    const id = req.params.id
    const where = { id }

    try {
        await NewsRepo.update(where, newsToUpdate, transaction)
        await transaction.commit()
        const news = await NewsRepo.findById(id)
        res.status(200).json(news)
    } catch (e) {
        await transaction.rollback()
        handleError(res, e)
    }
}

module.exports.delete = async function (req, res) {
    const transaction = await sequelize.transaction()

    try {
        await NewsRepo.destroyById(req.params.id, transaction)
        await transaction.commit()
        res.status(200).json({
            message: 'Новость успешно удалена.'
        })
    } catch (e) {
        await transaction.rollback()
        handleError(res, e)
    }
}