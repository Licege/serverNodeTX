const Dish = require('../models/Menu')
const errorHandler = require('../utilus/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const dishes = await Dish.find({})
        res.status(200).json(dishes)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getByCategoryId = async function (req, res) {
    try {
        const dish = await Dish.find({
            category: req.params.categoryId
        })
        res.status(200).json(dish)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    try {
        await Dish.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Блюдо успешно удалено.'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    const dish = new Dish({
        title: req.body.title,
        description: req.body.description,
        weight: req.body.weight,
        cost: req.body.cost,
        category: req.body.category,
        imageSrc: req.file ? req.file.path : ''
    })

    try {
        await dish.save()
        res.status(201).json(dish)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    const updated = {
        title: req.body.title,
        description: req.body.description,
        weight: req.body.weight,
        cost: req.body.cost,
        category: req.body.category
    }

    if (req.file) {
        updated.imageSrc = req.file.path
    }

    try {
        const dish = await Dish.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
            )
        res.status(200).json(dish)
    } catch (e) {
        errorHandler(res, e)
    }
}