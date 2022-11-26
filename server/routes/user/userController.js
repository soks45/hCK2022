const userService = require('../../services/userService')


class userController {
    async create(request, response,next){
        const token = await userService.create(request.body)
        return response.json(token)
    }

    async login (request, response, next){
        const token = await userService.login(request.body)
        return response.json(token)
    }
    async updateJwt (request, response, next) {
        const token = await userService.updateJwt(request.user.id, request.user.email, request.user.role)
        return response.json({token})
    }

}

module.exports = new userController ()