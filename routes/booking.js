const {Router} = require('express')
const requiredAuth = require('../middlewares/requiredauth')
const bookingController = require('../controllers/booking')
const requiredAdmin = require('../middlewares/requiredAdmin')
const router = Router()

router
.post(
    '/initiate',
    requiredAuth({access_token:true,browser_id:true,user_agent:true,wallet:true}),
    bookingController.initiate
)

.post(
    '/selection',
    requiredAuth({access_token:true,browser_id:true,user_agent:true,wallet:true}),
    bookingController.selection
)

.post(
    '/payment',
    requiredAuth({access_token:true,browser_id:true,user_agent:true,wallet:true}),
    bookingController.payment
)

.post(
    '/cancel',
    requiredAuth({access_token:true,browser_id:true,user_agent:true,wallet:true}),
    bookingController.cancel
)

.get(
    '/all',
    requiredAdmin({admin_token:true,role:true}),
    bookingController.getAll
)

module.exports =router