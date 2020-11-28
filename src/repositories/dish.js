const { Dish: DishModel } = require('../models').init()
const createBasicMethods = require('../lib/factories/modelFactory')

const Dish = createBasicMethods(DishModel)

module.exports = {
    ...Dish
}