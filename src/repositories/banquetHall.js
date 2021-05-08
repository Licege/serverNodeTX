const { BanquetHall: BanquetHallModel } = require('../models').init()
const createBasicMethods = require('../lib/factories/modelFactory')

const BanquetHall = createBasicMethods(BanquetHallModel)

module.exports = {
    ...BanquetHall
}