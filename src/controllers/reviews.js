const { sequelize, User } = require('../models').init()
const ReviewsRepo = require('../repositories/review')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const where = {}

        if (req.query.createdAtStart) {
            where.createdAt = {
                $gte: req.query.createdAtStart
            }
        }
        if (req.query.createdAtEnd) {
            if (!req.query.createAtStart) {
                where.createdAt = {}
            }
            where.createdAt[$lte] = req.query.createdAtEnd
        }
        if (req.query.status) {
            where.status = req.query.status
        }
        if (req.query.rating) {
            where.rating = req.query.rating
        }

        const include = [
            {
                model: User,
                attributes: []
            }
        ]

        const reviews = await ReviewsRepo.all(where, {
            include,
            limit: +req.query.limit || 0,
            offset: +req.query.offset || 0,
            order: [['updatedAt', 'DESC'], ['createdAt', 'DESC']]
        })

        res.status(200).json(reviews)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.publicGetAll = async function (req, res) {
    try {
        const where = { status: 1 }

        const include = [
            {
                model: User,
                attributes: []
            }
        ]

        const reviews = await ReviewsRepo.all(where, {
            include,
            limit: +req.query.limit,
            offset: +req.query.offset
        })

        res.status(200).json(reviews)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const include = [
            {
                model: User,
                attributes: []
            }
        ]

        const review = await ReviewsRepo.findById(req.params.id)

        res.status(200).json(review)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    const transaction = await sequelize.transaction()

    try {
        // const reviews = await Reviews
        //     .find()
        //     .populate('user')
        //
        // if (hasReview(req.user, reviews)) {
        //     console.log('д1а')
        // }
        const reviewToCreate = {
            user: req.user,
            rating: req.body.rating,
            description: req.body.description,
            imageSrc: req.file ? req.file.path : ''
        }

        const review = await ReviewsRepo.create(reviewToCreate, transaction)
        await transaction.commit()
        res.status(200).json(review)
    } catch (e) {
        await transaction.rollback()
        if (e.code === 11000) {
            res.status(400).json({message: 'Отзыв уже был оставлен!'})
        } else {
            errorHandler(res, e)
        }
    }
}

module.exports.update = async function (req, res) {
    const transaction = await sequelize.transaction()

    const reviewToUpdate = {
        rating: req.body.rating,
        description: req.body.description,
        status: req.body.status
    }
    if (req.file) {
        reviewToUpdate.imageSrc = req.file.path
    }
    try {
        const where = { id: req.params.id }
        const review = await ReviewsRepo.update(where, reviewToUpdate, transaction)
        await transaction.commit()
        res.status(200).json(review)
    } catch (e) {
        await transaction.rollback()
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    const transaction = await sequelize.transaction()

    try {
        await ReviewsRepo.destroyById(req.params.id, transaction)
        await transaction.commit()
        res.status(204).send()
    } catch (e) {
        await transaction.rollback()
        errorHandler(res, e)
    }
}

// status
// 0 - Неодобрен
// 1 - Одобрен
// 2 - Отклонен
const hasReview = (userId, reviews) => {
    const review = reviews.filter(r => r.user._id.toString() === userId)[0]

    if (review && review.length) {
        console.log('отзыв ', !(review.status === 0 || review.status === 1))
        return !(review.status === 0 || review.status === 1)
    }

    return false
}
