import Fetcher from '../helpers/fetcher'

const kinveyBaseUrl = "https://baas.kinvey.com";
const kinveyAppKey = "kid_Bk3haU7TQ";
const kinveyAppSecret = "3eacdc7655d84ba3a550b115ec7e5d7e";

const userFetcher = new Fetcher(kinveyBaseUrl);


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
        'Authorization': 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret)
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
    return userFetcher.post(`user/${kinveyAppKey}/login`, basicAuthInit, userData)
}

function register(email, password) {
    let userData = {
        username: email,
        password,
    };

    return userFetcher.post(`user/${kinveyAppKey}`, basicAuthInit, userData);
}


function logout() {
    return userFetcher.post(`user/${kinveyAppKey}/_logout`, kinveyAuthInit());
}

export const userService = {
    login, register, logout, saveSession, clearSession
};



