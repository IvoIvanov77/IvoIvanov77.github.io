
export default class Fetcher {
    constructor(apiUrl){
        this.apiUrl = apiUrl;
    }

    get(endPoint, init, responseContentType, needResponse){

        if(needResponse){
            return fetch(`${this.apiUrl}${endPoint}`, init)
        }

        return fetch(`${this.apiUrl}/${endPoint}`, init)
            .then(res => {
                if(responseContentType === 'text'){
                    return res.text()
                }
                return res.json()})
    }

    post(endPoint, init, data){
        init.method = 'POST';
        if(data){
            init.body = JSON.stringify(data);
        }
        return fetch(`${this.apiUrl}/${endPoint}`, init)
            .then(res => {
                if(res.status === 204){
                    return res.text();
                }
                return res.json()
            })
    }
}