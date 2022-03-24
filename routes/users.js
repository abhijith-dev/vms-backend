const {Router} = require('express')
const userController = require('../controllers/users')
const requiredAuth = require('../middlewares/requiredauth')
const router = Router()

router
.post(
    '/create',
    requiredAuth({user_agent:true,browser_id:true}),
    userController.create
)

module.exports = router