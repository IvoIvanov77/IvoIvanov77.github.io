import {userService} from "../services/userService";

function startAjaxCall() {return {type: 'START_AJAX_CALL', ajaxCalls:0}}
function gotUserData() {return {type: 'GOT_USER_DATA'}}
function clearUserData() {return {type: 'CLEAR_USER_DATA'}}
// function gotTree(data) {return {type: 'GOT_TREE', data}}
// function gotContent(data) {return {type: 'GOT_CONTENT', data}}
function successAjaxCall() {return {type: 'SUCCESS_AJAX_CALL'}}
function handleError(errorMessage) {return {type: 'FAIL_AJAX_CALL', errorMessage}}

export {
    registerUser, loginUser, logoutUser
}

function registerUser(email, password) {
    return dispatch => {
        dispatch(startAjaxCall());
        userService.register(email, password)
            .then(
                data => {
                    if(data.error){
                        dispatch(handleError(data.error))
                    }else{
                        dispatch(gotUserData());
                        dispatch(successAjaxCall());
                        userService.saveSession(data);
                    }
                },
                error => {
                    dispatch(handleError(error.message))
                }
            );
    };
}

function loginUser(email, password) {
    return dispatch => {
        dispatch(startAjaxCall());
        userService.login(email, password)
            .then(
                data => {
                    if(data.error){
                        dispatch(handleError(data.error))
                    }else{
                        dispatch(gotUserData());
                        userService.saveSession(data);
                        dispatch(successAjaxCall());

                    }
                },
                error => {
                    dispatch(handleError(error.message))
                }
            );
    };
}

function logoutUser() {
    return dispatch => {
        dispatch(startAjaxCall());
        userService.logout()
            .then(
                data => {
                    console.log(data)
                    if(data.error){
                        dispatch(handleError(data.error))
                    }else{
                        dispatch(clearUserData());
                        dispatch(successAjaxCall());
                        userService.clearSession();
                    }
                },
                error => {
                    dispatch(handleError(error.message))
                }
            );
    };
}

