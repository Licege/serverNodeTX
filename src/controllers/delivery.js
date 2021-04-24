const { sequelize, Delivery } = require('../models').init()
const DeliveryRepo = require('../repositories/delivery')
const DishRepo = require('../repositories/dish')
const errorHandler = require('../utilus/errorHandler')

module.exports.getAll = async function (req, res) {
    const where = {}

    if (req.query.phone) {
        where.phone = { $regex: '.*' + req.query.phone + '.*' }
    }
    if (req.query.createdAtStart) {
        where.createdAt = {
            $gte: req.query.createdAtStart
        }
    }
    if (req.query.createdAtEnd) {
        if (!where.createdAt) {
            where.createdAt = {}
        }
        where.createdAt['$lte'] = req.query.createdAtEnd
    }
    if (req.query.totalPriceStart) {
        where.totalPrice = {
            $gte: req.query.totalPriceStart
        }
    }
    if (req.query.totalPriceEnd) {
        if (!req.query.totalPriceStart) {
            where.totalPrice = {}
        }
        where.totalPrice['$lte'] = req.query.totalPriceStart
    }
    if (req.query.timeDeliveryStart) {
        where.timeDelivery = {
            $gte: req.query.timeDeliveryStart
        }
    }
    if (req.query.timeDeliveryEnd) {
        if (!req.query.timeDeliveryStart) {
            where.timeDelivery = {}
        }
        where.timeDelivery['$lte'] = req.query.timeDeliveryEnd
    }
    if (req.query.paymentStatus) {
        where.paymentStatus = req.query.paymentStatus
    }
    if (req.query.deliveryStatus) {
        where.deliveryStatus = req.query.deliveryStatus
    }
    if (req.query.paymentType) {
        where.paymentType = req.query.paymentType
    }
    if (req.query.deliveryType) {
        where.deliveryType = req.query.deliveryType
    }
    if (req.query.status) {
        where.status = req.query.status
    }

    try {
        const deliveriesData = await Delivery.findAndCountAll({
            where,
            limit: 5,
            order: [['updatedAt', 'DESC'], ['createdAt', 'DESC']],
            raw: true
        })
        const deliveries = deliveriesData.rows
        const totalCount = deliveriesData.count.length

        res.status(200).json({ deliveries, totalCount })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const delivery = await DeliveryRepo.findById(req.params.id)
        res.status(200).json(delivery)
    } catch (e) {
        errorHandler(res, e)
    }
}

// module.exports.create = async function (req, res) {
//     const transaction = await sequelize.transaction();
//
//     try {
//         //валидация
//         const globalSettings = await GlobalSettings.findOne()
//
//         if (req.body.deliveryType === 'home') {
//             const settings = await Settings.findOne({city: req.body.address.city})
//             if (!settings) {
//                 res.status(400).json({message: 'Невалидные данные!'})
//             } else if (settings.freeDelivery > req.body.totalPrice && settings.priceForDelivery !== req.body.deliveryCost) {
//                 res.status(400).json({message: 'Невалидные данные!'})
//                 return;
//             } else if (settings.freeDelivery <= req.body.totalPrice && req.body.deliveryCost !== 0) {
//                 res.status(400).json({message: 'Невалидные данные!'})
//                 return;
//             }
//         } else if (req.body.deliveryType === 'restaurant') {
//             if (req.body.saleForPickup !== globalSettings.saleForPickup) {
//                 res.status(400).json({message: 'Невалидные данные!'})
//                 return;
//             }
//         }
//
//         const ids = req.body.list.map(({ id }) => id)
//         const where = { id: ids }
//         const dishes = await DishRepo.all(where)
//         let countItem = 0;
//         let totalPrice = 0;
//         for (let i = 0; i < req.body.list.length; i++) {
//
//             let dish = dishes.find(dish => dish.id === req.body.list[i].dishId)
//             if (req.body.list[i].cost !== dish.cost) {
//                 res.status(400).json({message: 'Невалидные данные!'})
//                 return;
//             }
//             totalPrice = totalPrice + dish.cost * req.body.list[i].count
//             countItem++
//         }
//         if (req.body.totalPrice !== totalPrice || req.body.list.length !== countItem) {
//             res.status(400).json({message: 'Невалидные данные!'})
//             return;
//         }
//
//         const delivery = await DeliveryRepo.create(req.body, transaction)
//         await transaction.commit()
//         res.status(201).json(delivery)
//     } catch (e) {
//         await transaction.rollback()
//         errorHandler(res, e)
//     }
// }

module.exports.update = async function (req, res) {
    try {
        const { id } = req.params
        const {
            address,
            comment,
            countPerson,
            deliveryCost,
            deliveryType,
            email,
            list,
            name,
            paymentStatus,
            paymentType,
            oddMoney,
            phone,
            price,
            sale,
            status,
            timeDelivery,
            userId
        } = req.body

        const newDeliveryOrder = {
            address,
            comment,
            countPerson,
            deliveryCost,
            deliveryType,
            email,
            list,
            name,
            paymentStatus,
            paymentType,
            oddMoney,
            phone,
            price,
            sale,
            status,
            timeDelivery,
            userId
        }

        await DeliveryRepo.update({ id }, newDeliveryOrder)
        const delivery = await DeliveryRepo.findById(id)
        res.status(200).json(delivery)
    } catch (e) {
        errorHandler(res,  e)
    }
}
