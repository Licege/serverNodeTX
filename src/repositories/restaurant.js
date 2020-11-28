const { Restaurant: RestaurantModel } = require('../models').init()
const createBasicMethods = require('../lib/factories/modelFactory')

const Restaurant = createBasicMethods(RestaurantModel)

module.exports = {
    ...Restaurant
}