const { Review: ReviewModel } = require('../models').init()
const createBasicMethods = require('../lib/factories/modelFactory')

const Review = createBasicMethods(ReviewModel)

module.exports = {
    ...Review
}