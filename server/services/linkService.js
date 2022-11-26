const uuidv4 = require('uuid')

class linkService {
    generateKey() {
        return uuidv4.v4();
    }

    async generate(request) {
        // const req = JSON.parse(request)
        const organization_id = request['organization_id']
        const emails = request['emails']

        let result = [];

        emails.forEach(email => {
            const key = this.generateKey()
            const pair = {
                'organization_id': organization_id,
                'email': email,
                'link_key': key
            }

            result.push(pair)
        })

        return result
    }
}

module.exports = new linkService()