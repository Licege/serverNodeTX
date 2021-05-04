const { sequelize, Category } = require('../models').init()
const DishRepo = require('../repositories/dish')
const errorHandler = require('../utilus/errorHandler')

module.exports.getAll = async function (req, res) {
    const where = {}

    if (req.query.category) {
        where.categoryId = req.query.category
    }
    try {
        const dishes = await DishRepo.all(where)
        res.status(200).json(dishes)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getByCategory = async function (req, res) {
    try {
        const where = { titleEn: req.params.category }
        const include = [
            {
                model: Category,
                attributes: [],
                where

            }
        ]
        const dishes = await DishRepo.all({}, { include })
        res.status(200).json(dishes)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const dish = await DishRepo.findById(req.params.id)
        res.status(200).json(dish)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    const transaction = await sequelize.transaction()

    try {
        await DishRepo.destroyById(req.params.id, transaction)
        await transaction.commit()
        res.status(200).json({
            message: 'Блюдо успешно удалено.'
        })
    } catch (e) {
        await transaction.rollback()
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    const { title, description, weight, cost, categoryId } = req.body
    const imageSrc = req.file ? req.file.path : ''

    const dishToAdd = {
        title,
        description,
        weight,
        cost,
        categoryId,
        imageSrc
    }

    try {
        console.log(dishToAdd);
        console.log(req.body);
        const dish = await DishRepo.create(dishToAdd)
        res.status(201).json(dish)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    const { id } = req.params

    const {
        title,
        description,
        weight,
        cost,
        category,
        is_delivery
    } = req.body

    const updatedData = {
        title,
        description,
        weight,
        cost,
        category,
        is_delivery
    }

    if (req.file) {
        updatedData.imageSrc = req.file.path
    }
    const where = { id }

    try {
        await DishRepo.update(where, updatedData)
        const dish = await DishRepo.findById(id)
        res.status(200).json(dish)
    } catch (e) {
        errorHandler(res, e)
    }
}

// module.exports.uploadPdf = async function (req, res) {
//     try {
//         if (req.file) {
//             const menu = {
//                 fileSrc: req.file.path
//             }
//
//             await menu.save()
//             res.status(201).json(menu)
//         } else {
//             res.status(400).json({
//                 message: 'Ошибка файл не найден!'
//             })
//         }
//     } catch (e) {
//         errorHandler(res, e)
//     }
// }
