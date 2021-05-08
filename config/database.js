const defaultDBConfig = {
    username: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
    pool: {
        max: 100,
        min: 0,
        idle: 20000,
        acquire: 10000,
        handleDisconnects: true
    }
}

module.exports = {
    development: defaultDBConfig,
    production: defaultDBConfig
}