const Router = require('express')
const router = new Router()
const userRouter = require('./user/userRouter')
router.use('/user',userRouter)

module.exports = router