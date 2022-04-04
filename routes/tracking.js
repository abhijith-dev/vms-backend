const {Router} = require('express')
const requiredAdmin = require('../middlewares/requiredAdmin')
const trackingController = require('../controllers/tracking')

const router =Router()

router
.post(
    '/vehicle',
    requiredAdmin({admin_token:true,role:true}),
    trackingController.vehicle
)

module.exports = router