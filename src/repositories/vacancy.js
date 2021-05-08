const { Vacancy: VacancyModel } = require('../models').init()
const createBasicMethods = require('../lib/factories/modelFactory')

const Vacancy = createBasicMethods(VacancyModel)

module.exports = {
    ...Vacancy
}