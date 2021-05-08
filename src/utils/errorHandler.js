module.exports = (res, error, code = 500) => {
    console.log(error);
    res.status(code).json({
        success: false,
        message: error.models ? error.message : error
    })
}