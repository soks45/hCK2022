const Router = require('express')
const router = new Router()
const userController = require('./userController')
const authMiddleware = require('../../middleware/authMiddleware')

router.post('/registration', userController.create)
router.post('/login', userController.login)
router.get('/auth', authMiddleware,userController.updateJwt)
router.get('/get-users', userController.getUsers)
//router.post('/', userController.post)

module.exports = router