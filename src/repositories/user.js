const { User: UserModel } = require('../models').init()
const createBasicMethods = require('../lib/factories/modelFactory')

const User = createBasicMethods(UserModel)

module.exports = {
    ...User
}