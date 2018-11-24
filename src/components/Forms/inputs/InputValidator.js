import * as EmailValidator from "email-validator/index";
import PasswordValidator from "password-validator";

let inputValidator = (() => {

    const validateEmail = (email) => {
        if(!email){
            return null;
        }
        if(EmailValidator.validate(email)){
            return 'success'
        }
        return 'error';
    };

    const validateConfirmEmail = (email, confirmEmail) =>{
        if(!confirmEmail){
            return null;
        }
        if(confirmEmail === email){
            return 'success'
        }
        return 'error'
    };

    const validateUserName = (username) => {
        if(!username){
            return null;
        }
        if(username.length > 2){
            return 'success'
        }
        return 'error';
    };


    const validatePassword = (password) => {
        const passValidator = new PasswordValidator();
        passValidator
            .is().min(6)
            .has().digits();

        if(!password){
            return null
        }
        if (passValidator.validate(password)) {
            return 'success';
        }
        return 'error';
    };

    const validateConfirmPassword = (password, confirmPass) => {
        if(!confirmPass){
            return null;
        }
        if(confirmPass === password){
            return 'success'
        }
        return 'error';
    }

    return{
        validateEmail,
        validateConfirmEmail,
        validateUserName,
        validatePassword,
        validateConfirmPassword
    }
})();

export default inputValidator;