const { Category: CategoryModel } = require('../models').init()
const createBasicMethods = require('../lib/factories/modelFactory')

const Category = createBasicMethods(CategoryModel)

module.exports = {
    ...Category
}