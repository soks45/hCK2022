const apiError = require('../error/apiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createJwt = (id, email, role) => {
    return  jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class userService {
    async create(request){
        const token = createJwt(1, 2, 3)
        return ({token})
    }

    async login (request){
        const token = createJwt(1, 2, 3)
        return ({token})
    }
    async updateJwt (id, email, role) {
        const token = createJwt(id, email, role)
        return ({token})
    }

}

module.exports = new userService ()