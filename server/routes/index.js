const Router = require('express')
const router = new Router()
const userRouter = require('./user/userRouter')

const linkRouter = require('./link/linkRouter')
const mailRouter = require('./mail/mailRouter')
const orgRouter = require('./organization/organizationRouter')

router.use('/user',userRouter)
router.use('/link', linkRouter)
router.use('/mail', mailRouter)
router.use('/organization', orgRouter)

module.exports = router