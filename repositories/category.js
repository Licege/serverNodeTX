const { Category: CategoryModel } = require('../postgres/models1').init()
const createBasicMethods = require('../lib/factories/modelFactory')

const Category = createBasicMethods(CategoryModel)

module.exports = {
    ...Category
}