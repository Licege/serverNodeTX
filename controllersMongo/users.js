const User = require('../modelsMongo/User')
const errorHandler = require('../src/utils/errorHandler')

module.exports.getAll = async function (req, res) {
    const query = {}
    if (req.query.surname) {
        query.surname = new RegExp('^'+req.query.surname+'$', "i")
    }

    if (req.query.forename) {
        query.forename = new RegExp('^'+req.query.forename+'$', "i")
    }

    if (req.query.email) {
        query.email = req.query.email
    }

    if (req.query.age_start) {
        query.age = {
            $gte: req.query.age_start
        }
    }

    if (req.query.age_end) {
        if (!req.query.age_start) {
            query.age = {}
        }
        query.age[$lte] = req.query.age_end
    }

    if (req.query.phone) {
        query.phone = req.query.phone
    }

    try {
        const users = await User.find(query)
        const total_count = await User.find(query).countDocuments()
        res.status(200).json({users, total_count})
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const user = await User.findOne({_id: req.params.id})
        res.status(200).json(user)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    const updated = {
        password: req.body.password,
        surname: req.body.surname,
        forename: req.body.forename,
        patronymic: req.body.patronymic,
        phone: req.body.phone,
        card_number: req.body.card_number,
        birthday: req.body.birthday
    }

    if (req.file) {
        updated.imageSrc = req.file.path
    }

    try {
        const user = await User.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(user)
    } catch (e) {
        errorHandler(res, e)
    }
}