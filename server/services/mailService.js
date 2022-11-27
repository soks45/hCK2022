const nodemailer = require('nodemailer');
const linkService = require('../services/linkService')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'union.hack2022@gmail.com',
        pass: 'pfpilycpupmodzig'
    }
});

class mailService {
    async invite(request) {
        const employees = await linkService.generate(request.body)

        employees.forEach(e => {
            const link = `http://localhost:8000/invite?organization_id=${e['organization_id']}&key=${e['link_key']}`
            const text = `Здравствуйте, вы были приглашены на вступление в организацию на платформе <i>UNION</i>. <br>Для регистрации перейдите по <a href="${link}"> этой ссылке</a>`

            const mailOptions = {
                from: 'union.hack2022@gmail.com',
                to: e['email'],
                subject: 'Приглашение на регистрацию',
                html: text
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(`Не удалось отправить приглашение на '${e['email']}`)
                    console.log(error);
                } else {
                    console.log(`Приглашение отправлено на ${e['email']}: ` + info.response);
                }
            })
        })

        return JSON.stringify(`{}`)
    }
}

module.exports = new mailService()