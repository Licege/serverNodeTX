const { Delivery, GlobalSettings, Settings } = require('../models').init()
const DeliveryRepo = require('../repositories/delivery')
const DishRepo = require('../repositories/dish')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    const { phone, createdAtStart, createdAtEnd, totalPriceStart, totalPriceEnd, timeDeliveryStart, timeDeliveryEnd, paymentStatus, paymentType, deliveryStatus, deliveryType, status } = req.query

    const where = {}

    if (phone) {
        where.phone = { $regex: `.*${phone}.*` }
    }
    if (createdAtStart) {
        where.createdAt = {
            $gte: createdAtStart
        }
    }
    if (createdAtEnd) {
        if (!where.createdAt) {
            where.createdAt = {}
        }
        where.createdAt['$lte'] = createdAtEnd
    }
    if (totalPriceStart) {
        where.totalPrice = {
            $gte: totalPriceStart
        }
    }
    if (totalPriceEnd) {
        if (!totalPriceStart) {
            where.totalPrice = {}
        }
        where.totalPrice['$lte'] = totalPriceStart
    }
    if (timeDeliveryStart) {
        where.timeDelivery = {
            $gte: timeDeliveryStart
        }
    }
    if (timeDeliveryEnd) {
        if (!timeDeliveryStart) {
            where.timeDelivery = {}
        }
        where.timeDelivery['$lte'] = timeDeliveryEnd
    }
    if (paymentStatus) {
        where.paymentStatus = paymentStatus
    }
    if (deliveryStatus) {
        where.deliveryStatus = deliveryStatus
    }
    if (paymentType) {
        where.paymentType = paymentType
    }
    if (deliveryType) {
        where.deliveryType = deliveryType
    }
    if (status) {
        where.status = status
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

module.exports.create = async function (req, res) {
    const { address, deliveryType, deliveryCost, totalPrice, saleForPickup, list } = req.body

    try {
        //валидация
        const globalSettings = await GlobalSettings.findOne()

        if (deliveryType === 'home') {
            const settings = await Settings.findOne({city: address.city})
            if (!settings) {
                return res.status(400).json({message: 'Невалидные данные!'})
            }
            if (settings.freeDelivery > totalPrice && settings.priceForDelivery !== deliveryCost) {
                return res.status(400).json({message: 'Невалидные данные!'})
            }
            if (settings.freeDelivery <= totalPrice && deliveryCost !== 0) {
                return res.status(400).json({message: 'Невалидные данные!'})
            }
        } else if (deliveryType === 'restaurant') {
            if (saleForPickup !== globalSettings.saleForPickup) {
                return res.status(400).json({message: 'Невалидные данные!'})
            }
        }

        const ids = list.map(({ id }) => id)
        const where = { id: ids }
        const dishes = await DishRepo.all(where)

        let countItem = 0;
        let calculatedTotalPrice = 0;

        list.forEach(listItem => {
            const dish = dishes.find(dish => dish.id === listItem.dishId)
            if (listItem.cost !== dish.cost) {
                return res.status(400).json({message: 'Невалидные данные!'})
            }
            calculatedTotalPrice += dish.cost * listItem.count
            countItem++
        })

        if (totalPrice !== calculatedTotalPrice || list.length !== countItem) {
            return res.status(400).json({message: 'Невалидные данные!'})
        }

        const delivery = await DeliveryRepo.create(req.body)

        return res.status(201).json(delivery)
    } catch (e) {
        return errorHandler(res, e)
    }
}

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
