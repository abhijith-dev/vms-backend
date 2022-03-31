const {Router} = require('express')
const router = Router()
const requiredAdmin = require('../middlewares/requiredAdmin')
const driverController = require('../controllers/drivers')

router
.post(
    '/create',
    requiredAdmin({admin_token:true,role:true}),
    driverController.create
)

.get( 
    '/get/:id',
    requiredAdmin({admin_token:true,role:false}),
    driverController.getSingle   
)

.get(
    '/getAll',
    requiredAdmin({admin_token:true,role:false}),
    driverController.getAll    
)

.put(
    '/update/:id',
    requiredAdmin({admin_token:true,role:true}),
    driverController.update   
)

.delete(
    '/delete/:id',
    requiredAdmin({admin_token:true,role:true}),
    driverController.delete    
)

.post(
    '/upload/profile',
    requiredAdmin({admin_token:true,role:true}),
    driverController.uploadPicture
)

module.exports = router
