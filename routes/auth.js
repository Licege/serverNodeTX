const express = require('express')
const {check} = require('express-validator')
const controller = require('../controllers/auth')
const router = express.Router()

router.post('/login',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 8 символов')
            .isLength({min: 8})
    ],
    controller.login)
router.post('/register', controller.register)
router.post('/refresh-token', controller.refreshTokens)

module.exports = router