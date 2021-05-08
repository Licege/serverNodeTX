const { sequelize } = require('../models').init()
const VacanciesRepo = require('../repositories/vacancy')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const vacancies = await VacanciesRepo.all({}, {
            order: [['updatedAt', 'DESC'], ['createdAt', 'DESC']]
        })
        res.status(200).json(vacancies)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const vacancy = await VacanciesRepo.findById(req.params.id)
        res.status(200).json(vacancy)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    const transaction = await sequelize.transaction()

    const vacancyToCreate = {
        title: req.body.title,
        requirements: req.body.requirements,
        description: req.body.description,
        salaryFrom: req.body.salaryFrom,
        salaryTo: req.body.salaryTo,
        imageSrc: req.file ? req.file.path : ''
    }

    try {
        const vacancy = await VacanciesRepo.create(vacancyToCreate, transaction)
        await transaction.commit()
        res.status(200).json(vacancy)
    } catch (e) {
        await transaction.rollback()
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    const transaction = await sequelize.transaction()

    const vacancyToUpdate = {
        title: req.body.title,
        requirements: req.body.requirements,
        description: req.body.description,
        salaryFrom: req.body.salaryFrom,
        salaryTo: req.body.salaryTo
    }
    if (req.file) {
        vacancyToUpdate.imageSrc = req.file.path
    }

    try {
        const where = { id: req.params.id }

        const vacancy = await VacanciesRepo.update(where, vacancyToUpdate, transaction)
        await transaction.commit()
        res.status(200).json(vacancy)
    } catch (e) {
        await transaction.rollback()
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    const transaction = await sequelize.transaction()

    try {
        await VacanciesRepo.destroyById(req.params.id, transaction)
        await transaction.commit()
        res.status(200).json({
            message: 'Вакансия успешно удалена.'
        })
    } catch (e) {
        await transaction.rollback()
        errorHandler(res, e)
    }
}