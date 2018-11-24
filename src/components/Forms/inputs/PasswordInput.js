import React from 'react';
import GenericInput from "./GenericInput";

const PasswordInput = (props) => {
    return (
        <GenericInput
            inputId='passwordInput'
            validateInput={props.validatePassword}
            labelValue='Password'
            type='password'
            name='password'
            value={props.value}
            placeholder = 'password'
            handleChange={props.handleChange}
        />
    )
};

export default PasswordInput



