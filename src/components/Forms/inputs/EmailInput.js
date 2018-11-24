import React from 'react';
import GenericInput from "./GenericInput";

const EmailInput = (props) => {
    return (
        <GenericInput
            inputId='emailInput'
            validateInput={props.validateEmail}
            labelValue='Email'
            type='email'
            name='email'
            value={props.value}
            placeholder = 'example@email.com'
            handleChange={props.handleChange}
        />
    )
};

export default EmailInput



