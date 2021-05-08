const { Contacts: ContactModel } = require('../models').init()
const createBasicMethods = require('../lib/factories/modelFactory')

const Contacts = createBasicMethods(ContactModel)

module.exports = {
    ...Contacts
}