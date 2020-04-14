module.exports = {
    jwt: {
        access: {
            expiresIn: 900,
            type: 'access'
        },
        refresh: {
            expiresIn: 3600,
            type: 'refresh'
        }
    }
}