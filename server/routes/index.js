const Router = require('express')
const router = new Router()
const userRouter = require('./user/userRouter')
const linkRouter = require('./link/linkRouter')
router.use('/user',userRouter)
router.use('/link', linkRouter)

module.exports = router