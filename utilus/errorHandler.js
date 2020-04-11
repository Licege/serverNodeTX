module.exports = (res, error) => {
    res.status(500).json({
        success: false,
        message: error.models ? error.message : error
    })
}