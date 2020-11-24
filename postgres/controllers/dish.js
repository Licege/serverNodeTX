const { sequelize } = require('../models1').init()
const DishRepo = require('../../repositories/dish')
// const CategoryRepo = require('../../repositories/category')
const errorHandler = require('../../utilus/errorHandler')

module.exports.getAll = async function (req, res) {
    const where = {}

    if (req.query.category) {
        where.category = req.query.category
    }
    try {
        const dishes = await DishRepo.all()
        res.status(200).json(dishes)
    } catch (e) {
        errorHandler(res, e)
    }
}

// module.exports.getByCategory = async function (req, res) {
//     try {
//         const category = await Category.findOne({title_en: req.params.id})
//         const dishes = await Dish.find({category_id: category._id})
//         res.status(200).json(dishes)
//     } catch (e) {
//         errorHandler(res, e)
//     }
// }

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
    console.log(req.body);
    if (!Object.keys(req.body).length) {
        res.status(400);
        return
    }

    const dishToAdd = {
        title: req.body.title,
        description: req.body.description,
        weight: req.body.weight,
        cost: req.body.cost,
        categoryId: req.body.category_id,
        imageSrc: req.file ? req.file.path : ''
    }
    // const dishToAdd = {
    //     id: 1,
    //     title: 'Тест',
    //     description: 'тест тест',
    //     weight: 200,
    //     cost: 300,
    //     imageSrc: '',
    //     categoryId: 1
    // }

    const transaction = await sequelize.transaction()

    try {
        const dish = await DishRepo.create(dishToAdd, transaction)
        await transaction.commit()
        res.status(201).json(dish)
    } catch (e) {
        await transaction.rollback()
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    const updatedData = {
        title: req.body.title,
        description: req.body.description,
        weight: req.body.weight,
        cost: req.body.cost,
        category: req.body.category,
        is_delivery: req.body.is_delivery
    }

    if (req.file) {
        updatedData.imageSrc = req.file.path
    }
    const where = { id: req.params.id }

    const transaction = await sequelize.transaction()
    try {
        const dish = await DishRepo.update(where, updatedData, transaction)
        await transaction.commit()
        res.status(200).json(dish)
    } catch (e) {
        await transaction.rollback()
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
