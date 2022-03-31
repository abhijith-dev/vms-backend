const {Router} = require('express')
const adminController = require('../controllers/admin')
const router = Router()

router
.post(
    '/verification',
    adminController.verification
)

module.exports =router

