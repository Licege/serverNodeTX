const { GlobalSettings: GlobalDeliveryModel } = require('../models').init()
const createBasicMethods = require('../lib/factories/modelFactory')

const GlobalDelivery = createBasicMethods(GlobalDeliveryModel)

module.exports = {
    ...GlobalDelivery
}