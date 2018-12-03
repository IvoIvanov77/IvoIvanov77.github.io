export default class Fetcher {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    getResponse(endPoint, init) {
        return fetch(`${this.apiUrl}${endPoint}`, init)
    }

    getData(endPoint, init, responseContentType) {
        return fetch(`${this.apiUrl}${endPoint}`, init)
            .then(res => {
                if (responseContentType === 'text') {
                    return res.text()
                }
                return res.json()
            })
    }

    post(endPoint, init, data) {
        init.method = 'POST';
        if (data) {
            init.body = JSON.stringify(data);
        }
        return fetch(`${this.apiUrl}${endPoint}`, init)
            .then(res => {
                if (res.status === 204) {
                    return res.text();
                }
                return res.json()
            })
    }
}