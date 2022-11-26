const Router = require('express')
const router = new Router()
const mailController = require('./mailController')
// const authMiddleware = require('../../middleware/authMiddleware')

// router.post('/registration', userController.create)
// router.post('/login', userController.login)
// router.get('/auth', authMiddleware,userController.updateJwt)
router.post('/invite', mailController.invite)
//router.post('/', userController.post)

module.exports = router