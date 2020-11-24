const { BanquetHall: BanquetHallModel } = require('../postgres/models1').init()
const createBasicMethods = require('../lib/factories/modelFactory')

const BanquetHall = createBasicMethods(BanquetHallModel)

module.exports = {
    ...BanquetHall
}