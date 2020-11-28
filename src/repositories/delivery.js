const { Delivery: DeliveryModel } = require('../models').init()
const createBasicMethods = require('../lib/factories/modelFactory')

const Delivery = createBasicMethods(DeliveryModel)

module.exports = {
    ...Delivery
}