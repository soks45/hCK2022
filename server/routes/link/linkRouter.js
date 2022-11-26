const Router = require('express')
const router = new Router()
const linkController = require('./linkController')
// const linkMiddleware = require('../../middleware/authMiddleware')

// router.post('/registration', userController.create)
// router.post('/login', userController.login)
// router.get('/auth', authMiddleware, userController.updateJwt)
router.get('/generate', linkController.generateLink)
//router.post('/', userController.post)

module.exports = router