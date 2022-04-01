const {Router} = require('express')
const router = Router()
const requiredAdmin = require('../middlewares/requiredAdmin')
const reportController = require('../controllers/report')

router
.get(
    '/list',
    requiredAdmin({admin_token:true,role:true}),
    reportController.list
)

.post(
    '/download',
    requiredAdmin({admin_token:true,role:true}),
    reportController.download
)

module.exports = router