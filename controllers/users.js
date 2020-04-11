const User = require('../models/User')
const errorHandler = require('../utilus/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const users = await User.find({})
        res.status(200).json(users)
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