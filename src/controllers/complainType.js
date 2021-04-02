const ComplainType = require('../repositories/complainType')
const errorsHandler = require('../utilus/errorHandler')

module.exports.getAll = async function(req, res) {
    try {
        const types = await ComplainType.all()
        res.status(200).json(types)
    } catch (error) {
        errorsHandler(res, error)
    }
}