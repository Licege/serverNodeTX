const { Orders: OrdersModel } = require('../models').init()
const createBasicMethods = require('../lib/factories/modelFactory')

const Orders = createBasicMethods(OrdersModel)

module.exports = {
    ...Orders
}