const apiError = require('../error/apiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../services/dbConnect')

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

    async getActivatedUsers(request) {
        const id = request["organization_id"]
        const users = await db.query(`SELECT full_name, email, status from employee where organization_id = ${id}`)

        return users
    }

    async getRegisterLinks(request) {
        const id = request["organization_id"]
        const users = await db.query(`SELECT email, status from register_link where organization_id = ${id}`)

        return users
    }

}

module.exports = new userService ()