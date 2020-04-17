const Delivery = require('../../models/delivery/Delivery')
const Settings = require('../../models/delivery/CommonSettings')
const Dishes = require('../../models/Menu')
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
    if (req.query.payment_status) {
        query.payment_status = req.query.payment_status
    }
    if (req.query.delivery_status) {
        query.delivery_status = req.query.delivery_status
    }
    if (req.query.payment_type) {
        query.payment_type = req.query.payment_type
    }
    if (req.query.delivery_type) {
        query.delivery_type = req.query.delivery_type
    }
    if (req.query.status) {
        query.status = req.query.status
    }
    console.log(query);

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
        //валидация
        if (req.body.delivery_type === 'home') {
            const settings = await Settings.findOne({city: req.body.address.city})
            if (!settings) {
                res.status(400).json({message: 'Невалидные данные!'})
                if (settings.free_delivery > req.body.total_price && settings.price_for_delivery !== req.body.price_for_delivery) {
                    res.status(400).json({message: 'Невалидные данные!'})
                    return;
                } else if (settings.free_delivery <= req.body.total_price && req.body.price_for_delivery !== 0) {
                    res.status(400).json({message: 'Невалидные данные!'})
                    return;
                }
            }
        } else if (req.body.price_for_delivery !== 0) {
            res.status(400).json({message: 'Невалидные данные!'})
            return;
        }

        const dishes = await Dishes.find({})
        let countItem = 0;
        let totalPrice = 0;
        for (let i = 0; i < req.body.list.length; i++) {
            let dish = dishes.find(dish => dish._id.toString() === req.body.list[i].dish_id)
            if (req.body.list[i].cost !== dish.cost) {
                res.status(400).json({message: 'Невалидные данные!'})
                return;
            }
            totalPrice = totalPrice + dish.cost * req.body.list[i].count
            countItem++
        }
        if (req.body.total_price !== totalPrice || req.body.list.length !== countItem) {
            res.status(400).json({message: 'Невалидные данные!'})
            return;
        }

        const delivery = await new Delivery(req.body).save()
        res.status(201).json(delivery)
    } catch (e) {
        errorHandler(res, e)
    }
}