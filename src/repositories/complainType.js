const { ComplainType: ComplainTypeModel } = require('../models').init()
const createBasicMethods = require('../lib/factories/modelFactory')

const ComplainType = createBasicMethods(ComplainTypeModel)

module.exports = {
    ...ComplainType
}