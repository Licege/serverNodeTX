const Admin = require('../modelsMongo/Admin')
const errorHandler = require('../src/utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const admin = await Admin.find({}).populate('user_id')
        res.status(200).json(admin)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    try {
        const admin = await new Admin({
            user_id: req.params.id
        }).save()
        res.status(200).json(admin)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    try {
        await Admin.remove({user_id: req.params.id})
        res.status(200).json({
            message: 'Полномочия успешно удалены.'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}