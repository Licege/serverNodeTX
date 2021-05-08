const Delivery = require('../../modelsMongo/delivery/Delivery')
const errorHandler = require('../../src/utils/errorHandler')

module.exports.get = async function (req, res) {
    const query = {
        payment_status: 1,
        status: 3
    }

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

    console.log(query);

    try {
        const avg = await Delivery
            .aggregate([
                {$match: query},
                {
                    $group: {
                        _id: '$payment_type',
                        avg_delivery_check: {$avg: '$total_price'},
                        count: { $sum: 1 }
                    }
                }
            ])

        res.status(200).json(avg)
    } catch (e) {
        errorHandler(res, e)
    }
}
