const { Address: AddressModel } = require('../models').init()
const createBasicMethods = require('../lib/factories/modelFactory')

const Address = createBasicMethods(AddressModel)

module.exports = {
    ...Address
}