import React from 'react';
import InputValidator from "./inputs/InputValidator";
import EmailInput from "./inputs/EmailInput";
import PasswordInput from "./inputs/PasswordInput";
import Button from "react-bootstrap/es/Button";
import {Link, Redirect} from "react-router-dom";
import {loginUser} from "../../actions/userActions";
import { connect } from "react-redux";

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user : {
                email: '',
                password: ''
            },
            error: '',
            token: null
        }
    }

    handleUserChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        const user = this.state.user;
        user[name] = value;
        this.setState({
            user
        });
    };

    loginUser =(event)  => {
        event.preventDefault();
        if(InputValidator.validatePassword(this.state.user.password) !== 'success'
            || InputValidator.validateEmail(this.state.user.email) !== 'success'){
            this.setState({errorMessage: 'Error'});
            return;
        }
        this.setState({errorMessage: ''});
        this.props.dispatch(loginUser(this.state.user.email, this.state.user.password));
    };

    render() {
        if(sessionStorage.getItem('authtoken') || this.props.loggedInUser){
            return(
                <Redirect to=''/>
            )
        }
        return (
            <div className='form-container'>
                <form  onSubmit={this.loginUser}>
                    <div className="error">{this.state.error}</div>
                    <h1 style={{textAlign:'center'}}>Login Form</h1>
                    <EmailInput
                        validateEmail={InputValidator.validateEmail(this.state.user.email)}
                        value={this.state.user.email}
                        handleChange={this.handleUserChange}
                    />
                    <PasswordInput
                        validatePassword={InputValidator.validatePassword(this.state.user.password)}
                        value={this.state.user.password}
                        handleChange={this.handleUserChange}
                    />
                    <Button type="submit">Submit</Button>
                </form>
                <Link to='/register'>Register</Link>
            </div>
        )
    }
}

export const LoginFormContainer = connect((state) => {
    return {
        loggedInUser: state.loggedInUser
    }
})(LoginForm);
