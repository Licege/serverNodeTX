const { Token: TokenModel } = require('../models').init()
const createBasicMethods = require('../lib/factories/modelFactory')

const Token = createBasicMethods(TokenModel)

module.exports = {
    ...Token
}