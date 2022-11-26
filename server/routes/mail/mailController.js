const mailService = require('../../services/mailService')

class mailController {
    async invite(request, response, next){


        const result = await mailService.invite(request)

        return response.json({result})
    }
}

module.exports = new mailController()