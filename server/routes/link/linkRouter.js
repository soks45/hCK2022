const Router = require('express')
const router = new Router()
const linkController = require('./linkController')
// const linkMiddleware = require('../../middleware/authMiddleware')

router.post('/generate', linkController.generateLinkKey)

module.exports = router