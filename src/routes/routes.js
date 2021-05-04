const router = require('express').Router();
const passport = require('passport');
const {check} = require('express-validator');
const adminAuthFailed = require('../utilus/adminAuthFailed');

const upload = require('../middleware/upload');
const uploadPDF = require('../middleware/uploadPDF');

// const admin = require('../controllers/admin')
const auth = require('../controllers/auth');
const categories = require('../controllers/categories');
const contacts = require('../controllers/contacts');
const menu = require('../controllers/dish');
const news = require('../controllers/news');
const orders = require('../controllers/orders');
const promo = require('../controllers/promo');
const reviews = require('../controllers/reviews');
const users = require('../controllers/users');
const vacancies = require('../controllers/vacancies');
const delivery = require('../controllers/delivery');
const commonDeliverySettings = require('../controllers/deliveryCommonSettings');
const globalDeliverySettings = require('../controllers/deliveryGlobalSettings');
const averageChecks = require('../../controllersMongo/Statistics/averageChecks');
const profile = require('../controllers/profile');
const complain = require('../controllers/complain');
const complainType = require('../controllers/complainType');
// const files = require('../../controllersMongo/file')

module.exports = io => {
  // router
  //     .get('/api/private/admin', passport.authenticate('admin-jwt', {
  //         session: false,
  //         failWithError: true
  //     }), admin.getAll, adminAuthFailed)
  //     .post('/api/private/admin/:id', passport.authenticate('admin-jwt', {
  //         session: false,
  //         failWithError: true
  //     }), admin.create, adminAuthFailed)
  //     .delete('/api/private/admin/:id', passport.authenticate('admin-jwt', {
  //         session: false,
  //         failWithError: true
  //     }), admin.remove, adminAuthFailed)

  router
    .get('/api/private/categories', categories.getAll)
    .get('/api/private/categories/:id', categories.get)
    .post('/api/private/categories', categories.create)
    .patch('/api/private/categories/:id', categories.update)
    .delete('/api/private/categories/:id', categories.remove);

  router
    .get('/api/private/contacts', contacts.get)
    .patch('/api/private/contacts/:id', contacts.update);

  router
    .get('/api/private/menu', menu.getAll)
    .get('/api/private/menu/:category', menu.getByCategory)
    .get('/api/private/menu/dish/:id', menu.getById)
    .delete('/api/private/menu/:id', menu.remove)
    .post('/api/private/menu', upload.single('image'), menu.create)
    .patch('/api/private/menu/:id', upload.single('image'), menu.update);
  // .post('/api/private/menu/:id', passport.authenticate('admin-jwt', {
  //     session: false,
  //     failWithError: true
  // }), uploadPDF.single('file'), menu.uploadPdf, adminAuthFailed)

  router
    .get('/api/private/news', news.getAll)
    .get('/api/private/news/:id', news.getById)
    .post('/api/private/news', news.create)
    .patch('/api/private/news/:id', news.update)
    .delete('/api/private/news/:id', news.delete);

  router
    .get('/api/private/orders', orders.getAll)
    .get('/api/private/orders/:id', orders.getById)
    .patch('/api/private/orders/:id', orders.update)
    .delete('/api/private/orders/:id', orders.remove);

  router
    .get('/api/private/promos', promo.getAll)
    .get('/api/private/promos/:id', promo.getById)
    .post('/api/private/promos', upload.single('image'), promo.create)
    .patch('/api/private/promos/:id', upload.single('image'), promo.update);


  router
    .get('/api/private/reviews', reviews.getAll)
    .get('/api/private/reviews/:id', reviews.getById)
    .post('/api/private/reviews', reviews.create)
    .patch('/api/private/reviews/:id', reviews.update)
    .delete('/api/private/reviews/:id', reviews.remove);

  router
    .get('/api/private/users', users.getAll)
    .get('/api/private/users/:id', users.getById)
    .patch('/api/private/users/:id', users.update);

  router
    .get('/api/private/vacancies', vacancies.getAll)
    .get('/api/private/vacancies/:id', vacancies.getById)
    .post('/api/private/vacancies', vacancies.create)
    .patch('/api/private/vacancies/:id', vacancies.update)
    .delete('/api/private/vacancies/:id', vacancies.remove);

  router
    .get('/api/private/delivery', delivery.getAll)
    .get('/api/private/delivery/:id', delivery.getById)
    .patch('/api/private/delivery/:id', delivery.update);

  router
    .get('/api/private/delivery-settings/common/', commonDeliverySettings.getAll)
    .get('/api/private/delivery-settings/common/:id', commonDeliverySettings.getById)
    .post('/api/private/delivery-settings/common/', commonDeliverySettings.create)
    .patch('/api/private/delivery-settings/common/:id', commonDeliverySettings.update);

  router
    .get('/api/private/delivery-settings/global/', globalDeliverySettings.get)
    .patch('/api/private/delivery-settings/global/:id', globalDeliverySettings.update);

  router.get('/api/private/statistics/average-checks', averageChecks.get);


  /* Public */

  // router.post('/api/public/delivery', delivery.create)

  router
    .get('/api/public/delivery-settings/common', commonDeliverySettings.getAll)
    .get('/api/public/delivery-settings/common/:id', commonDeliverySettings.getById);

  router.get('/api/public/delivery-settings/global', globalDeliverySettings.get);

  router
  //   .post('/api/public/auth/login',
  //     [
  //       check('email', 'Некорректный email').isEmail(),
  //       check('password', 'Минимальная длина пароля 8 символов')
  //         .isLength({min: 8})
  //     ],
  //     auth.login)
    .post('/api/public/auth/registration', auth.register)
    .post('/api/public/auth/refresh-token', auth.refreshTokens);

  router
    .get('/api/public/categories', categories.getAll)
    .get('/api/public/categories/:id', categories.get);

  router.get('/api/public/contacts', contacts.get);

  router
    .get('/api/public/menu', menu.getAll)
    .get('/api/public/menu/:category', menu.getByCategory)
    .get('/api/public/menu/dish/:id', menu.getById);

  router
    .get('/api/public/news', news.getAll)
    .get('/api/public/news/:id', news.getById);

  router.post('/api/public/orders', orders.create);

  router
    .get('/api/public/me', profile.getMe)
    .get('/api/public/me/orders', profile.getMyOrders)
    .put('/api/public/me', profile.updateMe);

  router
    .get('/api/public/promos', promo.getAll)
    .get('/api/public/promos/:id', promo.getById);

  router
    .get('/api/public/reviews', reviews.publicGetAll)
    .get('/api/public/reviews/:id', reviews.getById)
    .post('/api/public/reviews', reviews.create)
    .patch('/api/public/reviews/:id', reviews.update)
    .delete('/api/public/reviews/:id', reviews.remove);

  router
    .get('/api/public/vacancies', vacancies.getAll)
    .get('/api/public/vacancies/:id', vacancies.getById);

  router
    .get('/api/public/complain-types', complainType.getAll);

  router
    .get('/api/private/complain', complain.getAll)
    .get('/api/private/complain/:id', complain.get)
    .post('/api/private/complain', complain.create)
    .post('/api/public/complain', complain.create)
    .patch('/api/private/complain/:id', complain.update)
    .delete('/api/private/complain/:id', complain.remove);

  // router.post('/', upload.array('files', 25), files.uploadFile)

  return router;
};