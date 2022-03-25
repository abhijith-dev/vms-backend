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

module.exports = router