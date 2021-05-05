const File = require('../modelsMongo/Files')
const errorHandler = require('../src/utils/errorHandler')

module.exports.uploadFile = async function (req, res) {
     let result = []
     for await (let file of req.files) {
        const newFile = new File({
            fieldName: req.body.fieldName,
            type: file.mimetype,
            preview: file.path
        })

        try {
            newFile.save()
            result.push(newFile)
        } catch (e) {
            errorHandler(res, e)
        }
    }
    res.status(201).json(result)
}

// module.exports.uploadFile = async function (req, res) {
//     let files = req.files.length === 1 ? req.files[0].path : []
//
//     req.files.length > 1 ? req.files.forEach(f => files.push(f.path)) : null
//
//     const file = new File({
//         fieldName: req.body.fieldName,
//         type: req.body.type,
//         preview: files
//     })
//
//     try {
//         await file.save()
//         res.status(201).json(file)
//     } catch (e) {
//         errorHandler(res, e)
//     }
// }