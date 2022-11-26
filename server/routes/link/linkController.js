import {v4 as uuidv4} from 'uuid';

const linkService = require('../../services/userService')


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

    async generateKey() {
        return uuidv4()
    }

    async generateLink(request, response, next) {
        const key: string = await this.generateKey()
        const emails = Json.parse(request)


    }

}

module.exports = new userController ()