const { News: NewsModel } = require('../models').init()
const createBasicMethods = require('../lib/factories/modelFactory')

const News = createBasicMethods(NewsModel)

module.exports = {
    ...News
}