const {Router} = require('express')
const requiredAdmin = require('../middlewares/requiredAdmin')
const analyticsController = require('../controllers/analytics')
const router = Router()

router
.get(
    '/data',
    requiredAdmin({admin_token:true,role:true}),
    analyticsController.data
)

module.exports = router