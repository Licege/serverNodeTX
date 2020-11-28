const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { sequelize } = require('../models').init()
const UserRepo = require('../repositories/user')
const TokenRepo = require('../repositories/token')
const keys = require('../../config/keys')
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
                message: 'Некорректные данные'
            })
        }

        const candidate = await UserRepo.one({email: req.body.email})

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
                    refreshToken: tokens.refreshToken,
                    profile: candidate
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

module.exports.register = async function (req, res) {
    const email = await UserRepo.one({ email: req.body.email })
    const phone = await UserRepo.one({ phone: req.body.phone })

    if (email) {
        res.status(409).json({
            message: 'Такой email уже зарегистрирован. Попробуйте другой.'
        })
    } else if (phone) {
        res.status(409).json({
            message: 'Такой телефон уже зарегистрирован. Попробуйте другой.'
        })
    } else {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const transaction = await sequelize.transaction()

        try {
            const user = await UserRepo.create({
                email: req.body.email,
                password: bcrypt.hashSync(password, salt),
                surname: req.body.surname,
                forename: req.body.forename,
                patronymic: req.body.patronymic,
                phone: req.body.phone
            }, transaction)
            await transaction.commit()
            res.status(201).json(user)
        } catch (e) {
            await transaction.rollback()
            errorHandler(res, e)
        }
    }
}