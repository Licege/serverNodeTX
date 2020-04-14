const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const User = require('../models/User')
const Admin = require('../models/Admin')
const Token = require('../models/Token')
const keys = require('../config/keys')
const authHelper = require('../utilus/authHelper')
const errorHandler = require('../utilus/errorHandler')

const updateTokens = async (userId) => {
    const accessToken = await authHelper.generateAccessToken(userId)
    const refreshToken = authHelper.generateRefreshToken()
    await authHelper.replaceRefreshToken(refreshToken.id, userId)

    return {
        accessToken: `Bearer ${accessToken}`,
        refreshToken: refreshToken.token
    }
}

module.exports.login = async function (req, res) {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные денные'
            })
        }

        const candidate = await User.findOne({email: req.body.email})

        if (candidate) {
            const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
            if (passwordResult) {

                /*const tokenBody = {
                    email: candidate.email,
                    userId: candidate._id
                }

                const isAdmin = await Admin.findOne({user_id: candidate._id})
                if (isAdmin) {
                    tokenBody.role = 'admin'
                }

                const token = jwt.sign(tokenBody, keys.jwt, {expiresIn: 3600})*/

                const tokens = await updateTokens(candidate._id)

                res.status(200).json({
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken
                })
            } else {
                res.status(401).json({
                    message: 'Неверный пароль. Попробуйте снова.'
                })
            }
        } else {
            res.status(404).json({
                message: 'Пользователь с таким email не найден.'
            })
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова'
        })
    }
}

module.exports.refreshTokens = async function (req, res) {
    const {refreshToken} = req.body
    let payload
    try {
        payload = jwt.verify(refreshToken, keys.jwt)
        console.log(payload)
        if (payload.type !== 'refresh') {
            res.status(400).json({message: 'Невалидный токен!'})
        }

        const token = await Token.findOne({tokenId: payload.id})
        console.log(token)
        if (!token) {
            res.status(400).json({message: 'Невалидный токен!'})
        }

        const newToken = await updateTokens(token.userId)

        res.json(newToken)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.register = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        res.status(409).json({
            message: 'Такой email уже зарегистрирован. Попробуйте другой.'
        })
    } else {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })

        try {
            await user.save()
            res.status(201).json(user)
        } catch (e) {
            errorHandler(res, e)
        }
    }
}