const Category = require('../modelsMongo/Category')
const errorHandler = require('../src/utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const categories = await Category.find({})
        res.status(200).json(categories)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.get = async function(req, res) {
    try {
        const category = await Category.findOne({_id: req.params.id})
        res.status(200).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    try {
        await Category.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Категория успешно удалена.'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    try {
        const category = await new Category({
            title: req.body.title,
            title_en: req.body.title_en
        }).save()
        res.status(200).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    try {
        const category = await Category.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
            )
        res.status(200).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
}

