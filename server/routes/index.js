const Router = require('express')
const router = new Router()
const userRouter = require('./user/userRouter')
const linkRouter = require('./link/linkRouter')
const mailRouter = require('./mail/mailRouter')

router.use('/user',userRouter)
router.use('/link', linkRouter)
router.use('/mail', mailRouter)


module.exports = router