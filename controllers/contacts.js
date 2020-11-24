const Contacts = require('../models1/Contacts')
const handlerError = require('../utilus/errorHandler')

module.exports.get = async function (req, res) {
    try {
        const contacts = await Contacts.findOne({})
        res.status(200).json(contacts)
    } catch (e) {
        handlerError(res, e)
    }
}

module.exports.update = async function (req, res) {
    try {
        const contacts = await Contacts.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true})
        res.status(200).json(contacts)
    } catch (e) {
        handlerError(res, e)
    }
}