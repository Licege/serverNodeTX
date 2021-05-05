const Vacancies = require('../modelsMongo/Vacancy')
const errorHandler = require('../src/utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const vacancies = await Vacancies.find({})
        res.status(200).json(vacancies)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const vacancy = await Vacancies.findOne({_id: req.params.id})
        res.status(200).json(vacancy)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    try {
        const vacancy = await new Vacancies({
            title: req.body.title,
            requirements: req.body.requirements,
            description: req.body.description,
            salary_from: req.body.salary_from,
            salary_to: req.body.salary_to,
            imageSrc: req.file ? req.file.path : ''
        }).save()
        res.status(200).json(vacancy)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    const updated = {
        title: req.body.title,
        requirements: req.body.requirements,
        description: req.body.description,
        salary_from: req.body.salary_from,
        salary_to: req.body.salary_to
    }
    if (req.file) {
        updated.imageSrc = req.file.path
    }

    try {
        const vacancy = await Vacancies.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(vacancy)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    try {
        await Vacancies.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Вакансия успешно удалена.'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}