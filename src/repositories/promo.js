const { Promo: PromoModel } = require('../models').init()
const createBasicMethods = require('../lib/factories/modelFactory')

const Promo = createBasicMethods(PromoModel)

module.exports = {
    ...Promo
}