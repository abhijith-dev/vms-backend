const {Router} = require('express')
const router = Router()
const requiredAdmin = require('../middlewares/requiredAdmin')
const vehicleController = require('../controllers/vehicles')

router
.post(
    '/bulkcreate',
    requiredAdmin({admin_token:true,role:true}),
    vehicleController.bulkCreate
)

.get( 
    '/get/:id',
    requiredAdmin({admin_token:true,role:false}),
    vehicleController.getSingle
    
)

.get(
    '/getAll',
    requiredAdmin({admin_token:true,role:false}),
    vehicleController.getAll
    
)

.put(
    '/update/:id',
    requiredAdmin({admin_token:true,role:true}),
    vehicleController.update   
)

.delete(
    '/delete/:id',
    requiredAdmin({admin_token:true,role:true}),
    vehicleController.delete 
    
)

module.exports = router
