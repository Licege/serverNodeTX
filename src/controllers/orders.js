const { sequelize } = require('../models').init()
const OrdersRepo = require('../repositories/orders')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    const where = {}

    if (req.query.orderDateStart) {
        where.orderDate = {
            $gte: req.query.orderDateStart
        }
    }
    if (req.query.orderDateEnd) {
        if (!req.query.orderDateStart) {
            where.orderDate = {}
        }
        where.orderDate[$lte] = req.query.orderDateEnd
    }
    if (req.query.createdAtStart) {
        where.createdAt = {
            $gte: req.query.createdAtStart
        }
    }
    if (req.query.createdAtEnd) {
        if (!req.query.createdAtStart) {
            where.createdAt = {}
        }
        where.createdAt[$lte] = req.query.createdAtEnd
    }
    try {
        const orders = await OrdersRepo.all(where, {
            order: [['updatedAt', 'DESC'], ['createdAt', 'DESC']]
        })
        res.status(200).json(orders)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const order = await OrdersRepo.findById(req.params.id)
        res.status(200).json(order)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    const transaction = await sequelize.transaction()

    try {
        const order = await OrdersRepo.create(req.body, transaction)
        await transaction.commit()
        res.status(201).json(order)
    } catch (e) {
        await transaction.rollback()
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    const transaction = await sequelize.transaction()
    const where = { id: req.params.id }

    try {
        const order = await OrdersRepo.update(where, req.body, transaction)
        await transaction.commit()
        res.status(200).json(order)
    } catch (e) {
        await transaction.rollback()
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    const transaction = await sequelize.transaction()

    try {
        await OrdersRepo.destroyById(req.params.id)
        await transaction.commit()
        res.status(200).json({
            message: 'Заказ был успешно удален.'
        })
    } catch (e) {
        await transaction.rollback()
        errorHandler(res, e)
    }
}