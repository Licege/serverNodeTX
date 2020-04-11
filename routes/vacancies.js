const express = require('express')
const passport = require('passport')
const upload = require('../middleware/upload')
const controller = require('../controllers/vacancies')
const adminAuthFailed = require('../utilus/adminAuthFailed')
const router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.post('/', passport.authenticate('admin-jwt', {
    session: false,
    failWithError: true
}), upload.single('image'), controller.create, adminAuthFailed)
router.patch('/:id', passport.authenticate('admin-jwt', {
    session: false,
    failWithError: true
}), upload.single('image'), controller.update, adminAuthFailed)
router.delete('/:id', passport.authenticate('admin-jwt', {
    session: false,
    failWithError: true
}), controller.remove, adminAuthFailed)

module.exports = router