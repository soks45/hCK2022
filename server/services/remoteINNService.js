const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
const token = process.env.INN_API_TOKEN;


class InnService {
    async get_org_info(inn){
        let result_data = undefined
        const options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify({query: inn})
        }
        console.log(url)
        console.log(options)
        await fetch(url, options)
            .then(response => response.text())
            .then(result => result_data = result)
            .catch(error => console.log("error", error));
        return result_data
    }

}

module.exports = new InnService()