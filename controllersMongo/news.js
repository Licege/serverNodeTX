const News = require('../modelsMongo/News')
const handleError = require('../src/utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const news = await News.find({})
        const total_count = await News.countDocuments()
        res.status(200).json({
            news,
            total_count
        })
    } catch (e) {
        handleError(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const news = await News.findOne({_id: req.params.id})
        res.status(200).json(news)
    } catch (e) {
        handleError(res, e)
    }
}

module.exports.create = async function (req, res) {const News = require('../modelsMongo/News')
    const handleError = require('../src/utils/errorHandler')

    module.exports.getAll = async function (req, res) {
        try {
            const news = await News.find({})
            const total_count = await News.countDocuments()
            res.status(200).json({
                news,
                total_count
            })
        } catch (e) {
            handleError(res, e)
        }
    }

    module.exports.getById = async function (req, res) {
        try {
            const news = await News.findOne({_id: req.params.id})
            res.status(200).json(news)
        } catch (e) {
            handleError(res, e)
        }
    }

    module.exports.create = async function (req, res) {
        const news = new News({
            title: req.body.title,
            description: req.body.description,
            short_description: req.body.short_description,
            create_at: req.body.create_at,
            imageSrc: req.file ? req.file.path : ''
        })

        try {
            await news.save()
            res.status(201).json(news)
        } catch (e) {
            handleError(res, e)
        }
    }

    module.exports.update = async function (req, res) {
        const updated = {
            title: req.body.title,
            description: req.body.description,
            short_description: req.body.short_description,
        }

        if (req.file) {
            updated.imageSrc = req.file.path
        }

        try {
            const news = await News.findOneAndUpdate(
                {_id: req.params.id},
                {$set: updated},
                {new: true}
            )

            res.status(200).json(news)
        } catch (e) {
            handleError(res, e)
        }
    }

    module.exports.delete = async function (req, res) {
        try {
            await News.remove({_id: req.params.id})
            res.status(200).json({
                message: 'Новость успешно удалена.'
            })
        } catch (e) {
            handleError(res, e)
        }
    }
    const news = new News({
        title: req.body.title,
        description: req.body.description,
        short_description: req.body.short_description,
        create_at: req.body.create_at,
        imageSrc: req.file ? req.file.path : ''
    })

    try {
        await news.save()
        res.status(201).json(news)
    } catch (e) {
        handleError(res, e)
    }
}

module.exports.update = async function (req, res) {
    const updated = {
        title: req.body.title,
        description: req.body.description,
        short_description: req.body.short_description,
    }

    if (req.file) {
        updated.imageSrc = req.file.path
    }

    try {
        const news = await News.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )

        res.status(200).json(news)
    } catch (e) {
        handleError(res, e)
    }
}

module.exports.delete = async function (req, res) {
    try {
        await News.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Новость успешно удалена.'
        })
    } catch (e) {
        handleError(res, e)
    }
}