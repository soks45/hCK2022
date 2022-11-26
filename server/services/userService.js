const apiError = require('../error/apiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const DbService = require('./dbConnect')
const {logger} = require("sequelize/lib/utils/logger");

const createJwt = (id) => {
    return  jwt.sign(
        {id},
        process.env.SECRET_KEY,
        {expiresIn: '128h'}
    )
}

class userService {
    async create(request, cookies, response){
        const {join_data, is_active, exit_date, full_name, date_of_birth, position, organization_id} = request
        // const req = DbService.format(`INSERT INTO employee(join_data,
        //                                                          is_active,
        //                                                          exit_date,
        //                                                          full_name,
        //                                                          date_of_birth,
        //                                                          position)
        //                                            VALUES(?, ?, ?, ?, ?, ?)`, [join_data, is_active, exit_date, full_name, date_of_birth, position])
        try{
            const res = await DbService.queryRaw(`INSERT INTO employee(join_data,
            is_active,
            exit_date,
            full_name,
            date_of_birth,
            position,
            organization_id)
            VALUES(?, ?, ?, ?, ?, ?,?)`, [join_data, is_active, exit_date, full_name, date_of_birth, position,organization_id])
            response.body = request
            response.body.employee_id = res.insertId
            response.cookie('tokensssaaa', createJwt(full_name))
            return response.body
        }
        catch (err){
            return null
        }
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