const { Complain: ComplainModel } = require('../models').init()
const createBasicMethods = require('../lib/factories/modelFactory')

const Complain = createBasicMethods(ComplainModel)

module.exports = {
    ...Complain
}