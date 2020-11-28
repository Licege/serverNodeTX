const { CommonDelivery: CommonDeliveryModel } = require('../models').init()
const createBasicMethods = require('../lib/factories/modelFactory')

const CommonDelivery = createBasicMethods(CommonDeliveryModel)

module.exports = {
    ...CommonDelivery
}