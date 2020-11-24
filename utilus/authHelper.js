const jwt = require('jsonwebtoken')
const uuid = require('uuid/v4')
const Token = require('../models1/Token')
const Admin = require('../models1/Admin')
const tokens = require('../config/options').jwt
const secret = require('../config/keys')

const generateAccessToken = async (userId) => {
    const payload = {
        userId,
        type: tokens.access.type
    }

    const isAdmin = await Admin.findOne({user_id: userId})
    if (isAdmin) {
        payload.role = 'admin'
    }

    return jwt.sign(payload, secret.jwt, {expiresIn: tokens.access.expiresIn})
}

const generateRefreshToken = () => {
    const payload = {
        id: uuid(),
        type: tokens.refresh.type
    }

    return {
        id: payload.id,
        token: jwt.sign(payload, secret.jwt, {expiresIn: tokens.refresh.expiresIn})
    }
}

const replaceRefreshToken = async (tokenId, userId) => {
    await Token.findOneAndRemove({ userId })
    await Token.create({ tokenId, userId })
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    replaceRefreshToken
}