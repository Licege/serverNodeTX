const express = require('express')
const passport = require('passport')
const upload = require('../../middleware/upload')
const uploadPDF = require('../../middleware/uploadPDF')
const controller = require('../../controllers/menu')
const adminAuthFailed = require('../../utilus/adminAuthFailed')
const router = express.Router()

router.get('/', passport.authenticate('admin-jwt', {
    session: false,
    failWithError: true
}), controller.getAll, adminAuthFailed)

router.get('/:id', passport.authenticate('admin-jwt', {
    session: false,
    failWithError: true
}), controller.getByCategory, adminAuthFailed)

router.get('/dish/:id', passport.authenticate('admin-jwt', {
    session: false,
    failWithError: true
}), controller.getById, adminAuthFailed)

router.delete('/:id', passport.authenticate('admin-jwt', {
    session: false,
    failWithError: true
}), controller.remove, adminAuthFailed)

router.post('/', passport.authenticate('admin-jwt', {
    session: false,
    failWithError: true
}), upload.single('image'), controller.create, adminAuthFailed)

router.patch('/:id', passport.authenticate('admin-jwt', {
    session: false,
    failWithError: true
}), upload.single('image'), controller.update, adminAuthFailed)

router.post('/:id', passport.authenticate('admin-jwt', {
    session: false,
    failWithError: true
}), uploadPDF.single('file'), controller.uploadPdf, adminAuthFailed)

module.exports = router