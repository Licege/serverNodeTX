const { Dish: DishModel } = require('../models').init()
const createBasicMethods = require('../lib/factories/modelFactory')
const {makeDish} = require('../entity/dish');

const Dish = createBasicMethods(DishModel)

module.exports = {
    ...Dish,
    findById: async (id, { transaction = null, attributes = null, paranoid = true } = {}) => {
        const dish = await Dish.findById(id, { transaction, attributes, paranoid })
        return makeDish(dish)
    },
    one: async (where, { transaction = null, attributes = null, include = null, paranoid = true } = {}) => {
        const dish = await Dish.one(where, { transaction, attributes, include, paranoid })
        return makeDish(dish)
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
        const dishes = await Dish.all(where,
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

        return dishes.map(dish => makeDish(dish));
    },
    create: async (values, transaction) => {
      const dish = await Dish.create(values, transaction)
      return makeDish(dish);
    }
}