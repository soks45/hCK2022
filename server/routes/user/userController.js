const userService = require('../../services/userService')


class userController {
    async create(request, response){
        const result = await userService.create(request.body, request.cookies, response)
        return response.json(result)
    }

    async login (request, response, next){
        const token = await userService.login(request.body, response)
        return response.json(token)
    }
    async updateJwt (request, response, next) {
        const token = await userService.updateJwt(request.user.id, request.user.email, request.user.role)
        return response.json({token})
    }

}

module.exports = new userController ()