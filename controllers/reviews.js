const Reviews = require('../models/Reviews')
const errorHandler = require('../utilus/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const query = {}

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
        if (req.query.status) {
            query.status = req.query.status
        }
        if (req.query.rating) {
            query.rating = req.query.rating
        }

        const reviews = await Reviews
            .find(query)
            .sort({create_at: -1})
            .skip(+req.query.offset)
            .limit(+req.query.limit)
            .populate('user')
        res.status(200).json(reviews)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.publicGetAll = async function (req, res) {
    try {
        const reviews = await Reviews
            .find({status: 1})
            .skip(+req.query.offset)
            .limit(+req.query.limit)
            .populate('user')
        res.status(200).json(reviews)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const review = await Reviews.findOne({_id: req.params.id}).populate('user')
        res.status(200).json(review)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    try {
        const review = await new Reviews({
            user: req.user,
            rating: req.body.rating,
            description: req.body.description,
            create_at: req.body.create_at,
            imageSrc: req.file ? req.file.path : ''
        }).save()
        res.status(200).json(review)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    const updated = {
        rating: req.body.rating,
        description: req.body.description,
        create_at: req.body.create_at
    }
    if (req.file) {
        updated.imageSrc = req.file.path
    }
    try {
        const review = await Reviews.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(review)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    try {
        await Reviews.remove({_id: req.params.id})
    } catch (e) {
        errorHandler(res, e)
    }
}