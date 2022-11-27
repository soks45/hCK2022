const apiError = require('../error/apiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const DbService = require('./dbConnect')
const {logger} = require("sequelize/lib/utils/logger");
const innService = require('./remoteINNService')
const {unsupportedEngine} = require("sequelize/lib/utils/deprecations");

const createJwt = (id) => {
    return  jwt.sign(
        {id},
        process.env.SECRET_KEY,
        {expiresIn: '128h'}
    )
}

class organizationService {
    async create(request, cookies, response){

        const inn_data = await innService.get_org_info(request.inn)
        const main_data = JSON.parse(inn_data).suggestions[0]
        const name = main_data.value
        const contact_full_name = main_data.data.management.name
        let contact_phone_number = undefined
        let password = undefined
        try{
            const res = await DbService.queryRaw(`INSERT INTO organization(
                                                        name,
                                                        inn,
                                                        contact_full_name,
                                                        contact_phone_number,
                                                        password)
                                                        VALUES(?, ?, ?, ?, ?)`, [name, request.inn, contact_full_name, contact_phone_number? contact_phone_number: "none", password? password : "none"])
            response.body = request
            response.body.organization_id = res.insertId
            response.cookie('token', createJwt(name))
            return response.body
        }
        catch (err){
            return err
        }
    }


    async login (request, response){
        const {inn, password} = request
        const res = await DbService.queryRaw(`SELECT * FROM organization WHERE inn=? AND password=? AND accepted=TRUE`, [inn, password])
        console.log(res)
        if(res.length !== 0) {
            const token = createJwt(res.name)
            console.log(res)
            console.log(res[0].organization_id)
            response.body = request
            response.body.organization_id = res[0].organization_id
            response.body.name = res[0].name
            response.body.inn = res[0].inn
            response.body.contact_full_name = res[0].contact_full_name
            response.body.contact_phone_number = res[0].contact_phone_number
            response.cookie('token', token)
            return response.body
        }
        else {
            response.body = "Error no such organization or it is not accepted currently"
            return response.body
        }
    }
    async acceptOrg(request, response){
        const user_id = request.employee_id
        const organization_id = request.organization_id
        const res = await DbService.queryRaw(`SELECT is_admin FROM employee WHERE employee_id=?`, [user_id])
        console.log(res)
        if (res){
            const res = await DbService.queryRaw(`UPDATE organization SET accepted = 1 WHERE organization_id=?`, [organization_id ])
        }
        return
    }

    async rejectOrg(request, response){
        const user_id = request.employee_id
        const organization_id = request.organization_id
        const res = await DbService.queryRaw(`SELECT is_admin FROM employee WHERE employee_id=?`, [user_id])
        console.log(res)
        if (res){
            const res = await DbService.queryRaw(`UPDATE organization SET accepted = 0 WHERE organization_id=?`, [organization_id])
        }
        return
    }

    async updateJwt (id, email, role) {
        const token = createJwt(id, email, role)
        return ({token})
    }

}

module.exports = new organizationService()