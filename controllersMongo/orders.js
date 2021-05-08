const Orders = require('../modelsMongo/Orders')
const errorHandler = require('../src/utils/errorHandler')

module.exports.getAll = async function (req, res) {
    const query = {}

    if (req.query.order_date_start) {
        query.order_date = {
            $gte: req.query.order_date_start
        }
    }
    if (req.query.order_date_end) {
        if (!req.query.order_date_start) {
            query.order_date = {}
        }
        query.order_date[$lte] = req.query.order_date_end
    }
    if (req.query.create_at_start) {
        query.create_at = {
            $gte: req.query.create_at_start
        }
    }
    if (req.query.create_at_end) {
        if (!req.query.create_at_start) {
            query.create_at = {}
        }
        query.create_at[$lte] = req.query.create_at_end
    }
    try {
        const orders = await Orders.find(query)
        res.status(200).json(orders)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const order = await Orders.findOne({_id: req.params.id})
        res.status(200).json(order)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    try {
        const order = await new Orders(req.body).save()
        res.status(201).json(order)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    try {
        const order = await Orders.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(order)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    try {
        await Orders.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Заказ был успешно удален.'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}