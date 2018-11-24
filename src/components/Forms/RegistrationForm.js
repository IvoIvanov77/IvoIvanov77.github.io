import React, { Component } from "react";
import {Button} from "react-bootstrap";
import EmailInput from "./inputs/EmailInput";
import InputValidator from './inputs/InputValidator'
import GenericInput from "./inputs/GenericInput";
import PasswordInput from "./inputs/PasswordInput";
import {Redirect} from "react-router-dom";
import Link from "react-router-dom/es/Link";
import {registerUser} from "../../actions/userActions";
import { connect } from "react-redux";

class RegistrationForm extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleUserChange = this.handleUserChange.bind(this);

        this.state = {
            user: {
                email: '',
                name: '',
                password: ''
            },
            confirmPassword: '',
            errorMessage: '',
            success: false,
            successMessage: ''

        };
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

    handleStateChange = event => {
        const target = event.target;
        const key = target.name;
        const value = target.value;

        this.setState((prevState) =>{
            prevState[key]= value;
            return {prevState}
        });
    };

    createUser =(event)  => {
        event.preventDefault();
        if(InputValidator.validatePassword(this.state.user.password) !== 'success'
            || InputValidator.validateEmail(this.state.user.email) !== 'success'){
            this.setState({errorMessage: 'Error'});
            return;
        }
        this.setState({errorMessage: ''});
        this.props.dispatch(registerUser(this.state.user.email, this.state.user.password));
    };

    render() {
        if(sessionStorage.getItem('authtoken') || this.props.loggedInUser){
            return(
                <Redirect to='/'/>
            )
        }

        return (
            <div className='form-container'>
                <h3 className='error'>{this.state.errorMessage}</h3>
                <h3 className='success'>{this.state.successMessage}</h3>
                <form  onSubmit={this.createUser}>
                    <h1 style={{textAlign:'center'}}>Registration Form</h1>
                    <EmailInput
                        validateEmail={InputValidator.validateEmail(this.state.user.email)}
                        value={this.state.user.email}
                        handleChange={this.handleUserChange}
                    />
                    <GenericInput
                        inputId='nameInput'
                        validateInput={InputValidator.validateUserName(this.state.user.name)}
                        labelValue='Username'
                        type='text'
                        name='name'
                        value={this.state.user.name}
                        placeholder = 'username'
                        handleChange={this.handleUserChange}
                    />
                    <PasswordInput
                        validatePassword={InputValidator.validatePassword(this.state.user.password)}
                        value={this.state.user.password}
                        handleChange={this.handleUserChange}
                    />
                    <GenericInput
                        inputId='confirmPasswordInput'
                        validateInput={InputValidator.validateConfirmPassword(
                            this.state.user.password,
                            this.state.confirmPassword
                        )}
                        labelValue='Confirm Password'
                        type='password'
                        name='confirmPassword'
                        value={this.state.confirmPassword}
                        placeholder = 'confirm password'
                        handleChange={this.handleStateChange}
                    />
                    <Button type="submit">Submit</Button>
                </form>
                <Link to='/login'>Login</Link>
            </div>

        );
    }
}

export const RegistrationFormContainer = connect((state) => {
    return {
        loggedInUser: state.loggedInUser
    }
})(RegistrationForm);
