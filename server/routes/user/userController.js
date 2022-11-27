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

    async getUsers(request, response, next) {
        const activatedUsers = await userService.getActivatedUsers(request.query)
        const registerLinks = await userService.getRegisterLinks(request.query)

        let users = []

        activatedUsers.forEach(u => {
            users.push({
                'full_name': u["full_name"],
                'status': u["status"]
            })
        })

        registerLinks.forEach(l => {
            let found = false
            users.forEach(u => {
                if(l["email"] == u["email"]) {
                    found = true
                }
            })

            if(!found) {
                users.push({
                    'full_name': l["email"],
                    'status': l["status"]
                })
            }
        })

        return response.json({users})
    }

}

module.exports = new userController ()