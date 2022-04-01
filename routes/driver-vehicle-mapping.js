const {Router} = require('express')
const router = Router()
const requiredAdmin = require('../middlewares/requiredAdmin')
const driverVehicleMappingController = require('../controllers/driver-vehicle-mapping')

router
.post(
    '/create',
    requiredAdmin({admin_token:true,role:true}),
    driverVehicleMappingController.create
)

.post(
    '/remove',
    requiredAdmin({admin_token:true,role:true}),
    driverVehicleMappingController.remove   
)

module.exports =router