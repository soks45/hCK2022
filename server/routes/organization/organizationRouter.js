const Router = require('express')
const router = new Router()
const orgService = require('./organizationController')
const authMiddleware = require('../../middleware/authMiddleware')

router.post('/registration', orgService.create)
router.get('/create-user', orgService.create)
router.post('/login', orgService.login)
router.get('/auth', authMiddleware,orgService.updateJwt)
//router.post('/', userController.post)

module.exports = router