const express = require('express')
const passport = require('passport')
const upload = require('../middleware/upload')
const adminAuthFailed = require('../utilus/adminAuthFailed')
const controller = require('../controllers/promo')
const router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.post('/', upload.single('image'), passport.authenticate('admin-jwt', {
    session: false,
    failWithError: true
}), controller.create, adminAuthFailed)
router.patch('/:id', upload.single('image'), passport.authenticate('admin-jwt', {
    session: false,
    failWithError: true
}), controller.update, adminAuthFailed)

module.exports = router