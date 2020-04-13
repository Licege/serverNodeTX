module.exports = {
    jwt: {
        access: {
            expiresIn: 1800,
            type: 'access'
        },
        refresh: {
            expiresIn: 3600,
            type: 'refresh'
        }
    }
}