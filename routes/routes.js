const router = require('express').Router()
const passport = require('passport')
const { check } = require('express-validator')
const adminAuthFailed = require('../utilus/adminAuthFailed')

const upload = require('../middleware/upload')
const uploadPDF = require('../middleware/uploadPDF')

const admin = require('../controllers/admin')
const auth = require('../controllers/auth')
const categories = require('../controllers/categories')
const contacts = require('../controllers/contacts')
const menu = require('../controllers/menu')
const news = require('../controllers/news')
const orders = require('../controllers/orders')
const promo = require('../controllers/promo')
const reviews = require('../controllers/reviews')
const users = require('../controllers/users')
const vacancies = require('../controllers/vacancies')
const delivery = require('../controllers/delivery/delivery')
const commonDeliverySettings = require('../controllers/delivery/commonSettings')
const globalDeliverySettings = require('../controllers/delivery/globalSettings')
const averageChecks = require('../controllers/Statistics/averageChecks')
const profile = require('../controllers/profile')
const files = require('../controllers/file')

const postBanq = require('../postgres/controllers/banquetHall')
const testDish = require('../postgres/controllers/dish')
const testCategory = require('../postgres/controllers/categories')

module.exports = () => {
    router
        .get('/api/private/admin', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), admin.getAll, adminAuthFailed)
        .post('/api/private/admin/:id', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), admin.create, adminAuthFailed)
        .delete('/api/private/admin/:id', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), admin.remove, adminAuthFailed)

    router
        .post('/api/private/auth/login',
            [
                check('email', 'Некорректный email').isEmail(),
                check('password', 'Минимальная длина пароля 8 символов')
                    .isLength({min: 8})
            ],
            auth.login)
        .post('/api/private/auth/registration', auth.register)
        .post('/api/private/auth/refresh-token', auth.refreshTokens)

    router
        .get('/api/private/categories', categories.getAll)
        .get('/api/private/categories/:id', categories.get)
        .post('/api/private/categories',
            passport.authenticate('admin-jwt', {session: false, failWithError: true}),
            categories.create, adminAuthFailed)
        .patch('/api/private/categories/:id', passport.authenticate('admin-jwt', {session: false, failWithError: true}),
            categories.update, adminAuthFailed)
        .delete('/api/private/categories/:id', passport.authenticate('admin-jwt', {session: false, failWithError: true}),
            categories.remove, adminAuthFailed)

    router
        .get('/api/private/contacts', contacts.get)
        .patch('/api/private/contacts/:id', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), contacts.update, adminAuthFailed)

    router
        .get('/api/private/menu', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), menu.getAll, adminAuthFailed)
        .get('/api/private/menu/:id', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), menu.getByCategory, adminAuthFailed)
        .get('/api/private/menu/dish/:id', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), menu.getById, adminAuthFailed)
        .delete('/api/private/menu/:id', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), menu.remove, adminAuthFailed)
        .post('/api/private/menu', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), upload.single('image'), menu.create, adminAuthFailed)
        .patch('/api/private/menu/:id', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), upload.single('image'), menu.update, adminAuthFailed)
        .post('/api/private/menu/:id', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), uploadPDF.single('file'), menu.uploadPdf, adminAuthFailed)

    router
        .get('/api/private/news', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), news.getAll, adminAuthFailed)
        .get('/api/private/news/:id', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), news.getById, adminAuthFailed)
        .post('/api/private/news', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), upload.single('image'), news.create, adminAuthFailed)
        .patch('/api/private/news/:id', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), upload.single('image'), news.update, adminAuthFailed)
        .delete('/api/private/news/:id', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), news.delete, adminAuthFailed)

    router
        .get('/api/private/orders', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), orders.getAll, adminAuthFailed)
        .get('/api/private/orders/:id', passport.authenticate('simple-jwt', {session: false}), orders.getById)
        .patch('/api/private/orders/:id', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), orders.update, adminAuthFailed)
        .delete('/api/private/orders/:id', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), orders.remove, adminAuthFailed)

    router
        .get('/api/private/promos', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), promo.getAll, adminAuthFailed)
        .get('/api/private/promos/:id', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), promo.getById, adminAuthFailed)
        .post('/api/private/promos', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), upload.single('image'), promo.create, adminAuthFailed)
        .patch('/api/private/promos/:id', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), upload.single('image'), promo.update, adminAuthFailed)


    router
        .get('/api/private/reviews', passport.authenticate('admin-jwt', {session: false, failWithError: true}),
            reviews.getAll, adminAuthFailed)
        .get('/api/private/reviews/:id', passport.authenticate('admin-jwt', {session: false}), reviews.getById)
        .post('/api/private/reviews', passport.authenticate('admin-jwt', {session: false}), reviews.create)
        .patch('/api/private/reviews/:id', passport.authenticate('admin-jwt', {session: false}), reviews.update)
        .delete('/api/private/reviews/:id', passport.authenticate('admin-jwt', {session: false}), reviews.remove)

    router
        .get('/api/private/users', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), users.getAll, adminAuthFailed)
        .get('/api/private/users/:id', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), users.getById, adminAuthFailed)
        .patch('/api/private/users/:id', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), users.update, adminAuthFailed)

    router
        .get('/api/private/vacancies', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), vacancies.getAll, adminAuthFailed)
        .get('/api/private/vacancies/:id', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), vacancies.getById, adminAuthFailed)
        .post('/api/private/vacancies', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), upload.single('image'), vacancies.create, adminAuthFailed)
        .patch('/api/private/vacancies/:id', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), upload.single('image'), vacancies.update, adminAuthFailed)
        .delete('/api/private/vacancies/:id', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), vacancies.remove, adminAuthFailed)

    router
        .get('/api/private/delivery', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), delivery.getAll, adminAuthFailed)
        .get('/api/private/delivery/:id', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), delivery.getById, adminAuthFailed)
        .patch('/api/private/delivery/:id', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), delivery.update, adminAuthFailed)

    router
        .get('/api/private/delivery-settings/common/', commonDeliverySettings.getAll)
        .get('/api/private/delivery-settings/common/:id', commonDeliverySettings.getById)
        .post('/api/private/delivery-settings/common/', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), commonDeliverySettings.create, adminAuthFailed)
        .patch('/api/private/delivery-settings/common/:id', passport.authenticate('admin-jwt', {
        session: false,
            failWithError: true
        }), commonDeliverySettings.update, adminAuthFailed)

    router
        .get('/api/private/delivery-settings/global/', globalDeliverySettings.get)
        .patch('/api/private/delivery-settings/global/:id', passport.authenticate('admin-jwt', {
            session: false,
            failWithError: true
        }), globalDeliverySettings.update, adminAuthFailed)

    router.get('/api/private/statistics/average-checks', averageChecks.get)


    /* Public */

    router.post('/api/public/delivery', delivery.create)

    router
        .get('/api/public/delivery-settings/common', commonDeliverySettings.getAll)
        .get('/api/public/delivery-settings/common/:id', commonDeliverySettings.getById)

    router.get('/api/public/delivery-settings/global', globalDeliverySettings.get)

    router
        .post('/api/public/auth/login',
            [
                check('email', 'Некорректный email').isEmail(),
                check('password', 'Минимальная длина пароля 8 символов')
                    .isLength({min: 8})
            ],
            auth.login)
        .post('/api/public/auth/registration', auth.register)
        .post('/api/public/auth/refresh-token', auth.refreshTokens)

    router
        .get('/api/public/categories', categories.getAll)
        .get('/api/public/categories/:id', categories.get)

    router.get('/api/public/contacts', contacts.get)

    router
        .get('/api/public/menu', menu.getAll)
        .get('/api/public/menu/:id', menu.getByCategory)
        .get('/api/public/menu/dish/:id', menu.getById)

    router
        .get('/api/public/news', news.getAll)
        .get('/api/public/news/:id', news.getById)

    router.post('/api/public/orders', orders.create)

    router
        .get('/api/public/me', passport.authenticate('simple-jwt', {session: false}), profile.getMe)
        .get('/api/public/me/orders', passport.authenticate('simple-jwt', {session: false}), profile.getMyOrders)
        .put('/api/public/me', passport.authenticate('simple-jwt', {session: false}), profile.updateMe)

    router
        .get('/api/public/promos', promo.getAll)
        .get('/api/public/promos/:id', promo.getById)

    router
        .get('/api/public/reviews', reviews.publicGetAll)
        .get('/api/public/reviews/:id', reviews.getById)
        .post('/api/public/reviews', passport.authenticate('simple-jwt', {session: false}), reviews.create)
        .patch('/api/public/reviews/:id', passport.authenticate('simple-jwt', {session: false}), reviews.update)
        .delete('/api/public/reviews/:id', passport.authenticate('simple-jwt', {session: false}), reviews.remove)

    router
        .get('/api/public/vacancies', vacancies.getAll)
        .get('/api/public/vacancies/:id', vacancies.getById)

    router.post('/', upload.array('files', 25), files.uploadFile)

    router.get('/api/test/dish', testDish.getAll)
    router.get('/api/test/dish/:id', testDish.getById)
    router.post('/api/test/dish', testDish.create)
    router.put('/api/test/dish/:id', testDish.update)
    router.delete('/api/test/dish', testDish.remove)

    router.get('/api/test/category', testCategory.getAll)
    router.get('/api/test/category/:id', testCategory.get)
    router.post('/api/test/category', testCategory.create)
    router.put('/api/test/category', testCategory.update)
    router.delete('/api/test/category', testCategory.remove)

    return router
}