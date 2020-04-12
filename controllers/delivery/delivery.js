const Delivery = require('../../models/delivery/Delivery')
const errorHandler = require('../../utilus/errorHandler')

module.exports.getAll = async function (req, res) {
    const query = {}

    if (req.query.create_at_start) {
        query.create_at = {
            $gte: req.query.create_at_start
        }
    }
    if (req.query.create_at_end) {
        if (!query.create_at) {
            query.create_at = {}
        }
        query.create_at['$lte'] = req.query.create_at_end
    }

    if (req.query.payment_status) {
        query.payment_status = req.query.payment_status
    }

    if (req.query.total_price_start) {
        query.total_price = {
            $gte: req.query.total_price_start
        }
    }
    if (req.query.total_price_end) {
        if (!req.query.total_price_start) {
            query.total_price = {}
        }
        query.total_price['$lte'] = req.query.total_price_end
    }
    if (req.query.delivery_status) {
        query.delivery_status = req.query.delivery_status
    }

    try {
        const delivery = await Delivery
            .find(query)
            .sort({create_at: -1})
            .skip(+req.query.offset)
            .limit(+req.query.limit)
        res.status(200).json(delivery)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const delivery = await Delivery.findOne({_id: req.params.id})
        res.status(200).json(delivery)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    try {
        const delivery = await new Delivery(req.body).save()
        res.status(200).json(delivery)
    } catch (e) {
        errorHandler(res, e)
    }
}