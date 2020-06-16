const File = require('../models/Files')
const errorHandler = require('../utilus/errorHandler')

module.exports.uploadFile = async function (req, res) {
    let files = req.files.length === 1 ? req.files[0].path : []

    req.files.length > 1 ? req.files.forEach(f => files.push(f.path)) : null

    const file = new File({
        fieldName: req.body.fieldName,
        type: req.body.type,
        preview: files
    })

    try {
        await file.save()
        res.status(201).json(file)
    } catch (e) {
        errorHandler(res, e)
    }
}