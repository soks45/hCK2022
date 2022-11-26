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
        console.log(request)
        const {join_data, is_active, exit_date, full_name, date_of_birth, position, organization_id,email,password} = request
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
            organization_id,
            email,
            password)
            VALUES(?, ?, ?, ?, ?, ?,?,?,?)`, [join_data, is_active, exit_date, full_name, date_of_birth, position,organization_id, email,password])
            response.body = request
            console.log(res)
            response.body.employee_id = res.insertId
            response.cookie('token', createJwt(full_name))
            return response.body
        }
        catch (err){
            return response.body = "Error creating user"

        }
    }


    async login (request, response){
        const {email, password} = request
        console.log(request)
        const res = await DbService.queryRaw(`SELECT * FROM employee WHERE (email=? AND password=?)`, [email, password])
        console.log(res)
        if(res.length !== 0) {
            const token = createJwt(res.name)
            console.log(res)
            console.log(res[0].organization_id)
            response.body = request
            response.body.organization_id = res[0].organization_id
            response.cookie('token', token)
            return response.body
        }
        else {
            response.body = "Error"
            return response.body
        }
    }
    async updateJwt (id, email, role) {
        const token = createJwt(id, email, role)
        return ({token})
    }

}

module.exports = new userService ()