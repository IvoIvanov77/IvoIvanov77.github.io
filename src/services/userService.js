import Fetcher from '../helpers/fetcher'
import {sensitiveData} from "../helpers/sensitiveData";

const baseUrl = sensitiveData.kinveyBaseUrl;
const appKey = sensitiveData.kinveyAppKey;
const appSecret = sensitiveData.kinveyAppSecret;

const userFetcher = new Fetcher(baseUrl);

function saveSession(userInfo) {
    let userAuth = userInfo._kmd.authtoken;
    sessionStorage.setItem('authtoken', userAuth);
    let userId = userInfo._id;
    sessionStorage.setItem('userId', userId);
    let username = userInfo.username;
    sessionStorage.setItem('username', username);

}

function clearSession() {
    sessionStorage.clear()
}


const basicAuthInit = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(appKey + ':' + appSecret)
    }
};

const kinveyAuthInit = () => {
    return{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Kinvey ' + sessionStorage.getItem('authtoken')
        }
    }
};


function login(email, password) {
    const userData = {
        username: email,
        password
    };
    return userFetcher.post(`user/${appKey}/login`, basicAuthInit, userData)
}

function register(email, password) {
    let userData = {
        username: email,
        password,
    };

    return userFetcher.post(`user/${appKey}`, basicAuthInit, userData);
}


function logout() {
    return userFetcher.post(`user/${appKey}/_logout`, kinveyAuthInit());
}

export const userService = {
    login, register, logout, saveSession, clearSession
};



