const orgService = require('../../services/organizationService')


class organizationController {
    async create(request, response){
        const result = await orgService.create(request.body, request.cookies, response)
        return response.json(result)
    }

    async login (request, response){
        const result = await orgService.login(request.body, response)
        return response.json(result)
    }
    async updateJwt (request, response, next) {
        const token = await orgService.updateJwt(request.user.id, request.user.email, request.user.role)
        return response.json({token})
    }

}

module.exports = new organizationController ()