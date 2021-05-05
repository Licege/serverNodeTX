const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { sequelize, User } = require('../models').init()
const UserRepo = require('../repositories/user')
const TokenRepo = require('../repositories/token')
const keys = require('../../config/keys')
const authHelper = require('../utils/authHelper')
const errorHandler = require('../utils/errorHandler')

const updateTokens = async (userId) => {
    const accessToken = await authHelper.generateAccessToken(userId)
    const refreshToken = authHelper.generateRefreshToken()
    await authHelper.replaceRefreshToken(refreshToken.id, userId)

    return {
        accessToken: `Bearer ${accessToken}`,
        refreshToken: refreshToken.token
    }
}

module.exports.login = async (req, res) => {
    res.json({ success: true })
}

module.exports.logout = async (req, res) => {
    req.logout()
    // res.redirect('/')
    // req.logOut()
    // req.session.destroy(() => {
    //     res.clearCookie(process.env.TRIXOLMA_SID)
    //     res.redirect('/')
    // })
}

module.exports.refreshTokens = async function (req, res) {
    const {refreshToken} = req.body
    let payload
    try {
        payload = jwt.verify(refreshToken, keys.jwt)
        if (payload.type !== 'refresh') {
            res.status(400).json({message: 'Невалидный токен!'})
        }

        const token = await TokenRepo.one({ tokenId: payload.id })
        if (!token) {
            res.status(400).json({message: 'Невалидный токен!'})
        }

        const newToken = await updateTokens(token.userId)

        res.json(newToken)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.register = async (req, res) => {
    const { email, phone, password, surname, forename, patronymic } = req.body
    const transaction = await sequelize.transaction()

    try {
        const emailInUse = await UserRepo.one({ email: req.body.email })
        const phoneInUse = await UserRepo.one({ phone: req.body.phone })

        if (emailInUse) {
            return res.status(409).json({
                message: 'Такой email уже зарегистрирован. Попробуйте другой.'
            })
        }
        if (phoneInUse) {
            return res.status(409).json({
                message: 'Такой телефон уже зарегистрирован. Попробуйте другой.'
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const user = await UserRepo.create({
            email,
            password: bcrypt.hashSync(password, salt),
            surname,
            forename,
            patronymic,
            phone
        })
        await transaction.commit()
        res.status(201).json(user)
    } catch (e) {
        await transaction.rollback()
        errorHandler(res, e)
    }
}