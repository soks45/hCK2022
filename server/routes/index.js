const Router = require('express')
const router = new Router()
const userRouter = require('./user/userRouter')
const orgRouter = require('./organization/organizationRouter')
router.use('/user',userRouter)
router.use('/organization', orgRouter)

module.exports = router