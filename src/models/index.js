const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const { Op } = Sequelize

const basename = path.basename(module.filename)
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + './../../config/database.js')[env]

if (config === undefined) {
    throw Error(`In src/config/database.js not config with such NODE_ENV: ${env}`)
}

const fileOfModels = fs
    .readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')

const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col
}

const initDB = () => {
    let sequelize
    if (config.use_env_constiable) {
        sequelize = new Sequelize(process.env[config.use_env_constiable])
    } else {
        sequelize = new Sequelize(config.database, config.username, config.password, { ...config, operatorsAliases })
    }

    const db = {}
    fileOfModels.forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
        db[model.name] = model
    })

    Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db)
        }
    })

    db.sequelize = sequelize
    db.Sequelize = Sequelize

    return db
}

let cachedInitDB
exports.init = () => {
    if (cachedInitDB) return cachedInitDB
    cachedInitDB = initDB()
    return cachedInitDB
}