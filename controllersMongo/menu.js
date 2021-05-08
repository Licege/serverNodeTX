const Dish = require('../modelsMongo/Menu')
const Category = require('../modelsMongo/Category')
const PdfMenu = require('../modelsMongo/PdfMenu')
const errorHandler = require('../src/utils/errorHandler')

module.exports.getAll = async function (req, res) {
    const query = {}

    if (req.query.category) {
        query.category = req.query.category
    }
    try {
        const dishes = await Dish.find(query)
        res.status(200).json(dishes)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getByCategory = async function (req, res) {
    try {
        const category = await Category.findOne({title_en: req.params.id})
        const dishes = await Dish.find({category_id: category._id})
        res.status(200).json(dishes)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const dish = await Dish.findOne({_id: req.params.id})
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
        category_id: req.body.category_id,
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
        category: req.body.category,
        is_delivery: req.body.is_delivery
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

module.exports.uploadPdf = async function (req, res) {
    try {
        if (req.file) {
            const menu = {
                fileSrc: req.file.path
            }

            await menu.save()
            res.status(201).json(menu)
        } else {
            res.status(400).json({
                message: 'Ошибка файл не найден!'
            })
        }
    } catch (e) {
        errorHandler(res, e)
    }
}
