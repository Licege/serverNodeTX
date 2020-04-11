module.exports = function (err, req, res, next) {
    return res.status(401).send({
        message: 'Доступ запрещен.'
    })
}