import {Nav, NavItem} from "react-bootstrap";
import React from "react";

export const AuthLinks = (props) => {
    if(!props.loggedInUser){
        return (
            <Nav pullRight>
                <NavItem  href="/login">
                    Sign In
                </NavItem>
                <NavItem href="/register">
                    Sign Up
                </NavItem>
            </Nav>
        )
    }else {
        return (
            <Nav pullRight>
                <NavItem onClick={props.logout}>
                    Sign Out
                </NavItem>
            </Nav>
        )
    }

};