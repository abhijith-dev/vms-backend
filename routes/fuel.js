const {Router} = require('express')
const router = Router()
const requiredAdmin = require('../middlewares/requiredAdmin')
const fuelController = require('../controllers/fuel')

router
.post(
    '/add',
    requiredAdmin({admin_token:true,role:true}),
    fuelController.add    
)

.get(
    '/getAll',
    requiredAdmin({admin_token:true,role:true}),
    fuelController.getAll    
)

module.exports = router