const { Promo: PromoModel } = require('../models').init()
const createBasicMethods = require('../lib/factories/modelFactory')
const { makePromo } = require('../entity/promo');

const Promo = createBasicMethods(PromoModel)

module.exports = {
    ...Promo,
    findById: async (id, { transaction = null, attributes = null, paranoid = true } = {}) => {
        const promo = await Promo.findById(id, { transaction, attributes, paranoid })
        return makePromo(promo)
    },
    one: async (where, { transaction = null, attributes = null, include = null, paranoid = true } = {}) => {
        const promo = await Promo.one(where, { transaction, attributes, include, paranoid })
        return makePromo(promo)
    },
    all: async (where,
                {
                    transaction,
                    attributes,
                    limit,
                    offset,
                    include,
                    group,
                    order,
                    paranoid
                } = {}) => {
        const promos = await Promo.all(where,
          {
              transaction,
              attributes,
              limit,
              offset,
              include,
              group,
              order,
              paranoid
          })

        return promos.map(promo => makePromo(promo));
    },
    create: async (values, transaction) => {
        const promo = await Promo.create(values, transaction)
        return makePromo(promo);
    }
}