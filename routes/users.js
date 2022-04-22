const {Router} = require('express')
const userController = require('../controllers/users')
const requiredAuth = require('../middlewares/requiredauth')
const router = Router()

router
.post(
    '/create',
    requiredAuth({user_agent:true,browser_id:true,wallet:true}),
    userController.create
)

.post(
    '/login',
    requiredAuth({user_agent:true,browser_id:true,wallet:true}),
    userController.login
)

.get(
    '/fetch',
    requiredAuth({user_agent:true,browser_id:true,access_token:true}),
    userController.fetch
)

.put(
    '/update',
    requiredAuth({user_agent:true,browser_id:true,access_token:true}),
    userController.update

)

.delete(
    '/delete',
    requiredAuth({user_agent:true,browser_id:true,access_token:true}),
    userController.delete
)

.post(
    '/wallet',
    requiredAuth({user_agent:true,browser_id:true,access_token:true}),
    userController.fetchWallet
)

.put(
    '/wallet/load',
    requiredAuth({user_agent:true,browser_id:true,access_token:true,wallet:true}),
    userController.loadWallet
)

.post(
    '/password/reset/internal',
    requiredAuth({user_agent:true,browser_id:true,access_token:true}),
    userController.resetPasswordInternal
)

.post(
    '/password/reset/external',
    requiredAuth({user_agent:true,browser_id:true}),
    userController.resetPasswordExternal
)

.post(
    '/password/reset/external/verify',
    requiredAuth({user_agent:true,browser_id:true}),
    userController.resetPasswordExternalVerify
)

.get(
   '/all',
   requiredAdmin({admin_token:true,role:true}),
   userController.all
)
module.exports = router
