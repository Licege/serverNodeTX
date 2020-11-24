module.exports = {
    jwt: {
        access: {
            expiresIn: 3600,
            type: 'access'
        },
        refresh: {
            expiresIn: 36000,
            type: 'refresh'
        }
    }
}