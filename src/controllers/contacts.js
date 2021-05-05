const { sequelize } = require('../models').init()
const ContactsRepo = require('../repositories/contacts')
const handlerError = require('../utils/errorHandler')

module.exports.get = async function (req, res) {
    try {
        const contacts = await ContactsRepo.one({})
        if (!contacts) return handlerError(res, 'Контакты пусты', 409)
        res.status(200).json(contacts)
    } catch (e) {
        handlerError(res, e)
    }
}

module.exports.update = async function (req, res) {
    const transition = await sequelize.transaction()

    try {
        const where = { id: req.params.id }
        const contacts = await ContactsRepo.update(where, req.body, transition)
        await transition.commit()
        res.status(200).json(contacts)
    } catch (e) {
        await transition.rollback()
        handlerError(res, e)
    }
}