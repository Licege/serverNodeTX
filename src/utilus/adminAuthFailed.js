module.exports = function (err, req, res, next) {
    console.log(err);
    return res.status(401).send({
        message: 'Доступ запрещен.'
    })
}