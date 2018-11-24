import React from 'react';
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";

const GenericInput = (props) =>{
    return (
        <FormGroup
            controlId={props.inputId}
            validationState={props.validateInput}
        >
            <ControlLabel>{props.labelValue}</ControlLabel>
            <FormControl
                type={props.type}
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.handleChange}
            />
            <FormControl.Feedback />
        </FormGroup>
    )
};

export default GenericInput