const linkService = require('../../services/linkService')
const db = require('../../services/dbConnect')

class linkController {
    generateKey() {
        return uuidv4()
    }

    async generateLinkKey(request, response, next) {
        const links = await linkService.generate(request.body)
        links.forEach(link => {
           db.query(`INSERT INTO register_link (email, link_key, organization_id) VALUES ('${link['email']}', '${link['link_key']}', ${link['organization_id']});`)
        })
        return response.json(links)
    }
}

module.exports = new linkController()