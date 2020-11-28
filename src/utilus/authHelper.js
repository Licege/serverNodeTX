const jwt = require('jsonwebtoken')
const uuid = require('uuid/v4')
const { sequelize } = require('../models').init()
const TokenRepo = require('../repositories/token')
const tokens = require('../../config/options').jwt
const secret = require('../../config/keys')

const generateAccessToken = async (userId) => {
    const payload = {
        userId,
        type: tokens.access.type
    }

    // const isAdmin = await Admin.findOne({user_id: userId})
    // if (isAdmin) {
    //     payload.role = 'admin'
    // }

    return jwt.sign(payload, secret.jwt, { expiresIn: tokens.access.expiresIn })
}

const generateRefreshToken = () => {
    const payload = {
        id: uuid(),
        type: tokens.refresh.type
    }

    return {
        id: payload.id,
        token: jwt.sign(payload, secret.jwt, { expiresIn: tokens.refresh.expiresIn })
    }
}

const replaceRefreshToken = async (tokenId, userId) => {
    const transaction = await sequelize.transaction()
    try {
        await TokenRepo.destroyById(userId, transaction)
        await TokenRepo.create({ tokenId, userId }, transaction)
        await transaction.commit()
    } catch (e) {
        await transaction.rollback()
    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    replaceRefreshToken
}