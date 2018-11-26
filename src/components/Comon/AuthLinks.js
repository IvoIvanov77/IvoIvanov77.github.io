import {Nav, NavItem, Navbar} from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";

export const AuthLinks = (props) => {
    if(!props.loggedInUser){
        return (
            <Nav pullRight>
                <Navbar.Brand >
                    <Link to='/login' style={{fontSize: '1em'}}>Sign In</Link>
                </Navbar.Brand>
                <Navbar.Brand >
                    <Link to='/register' style={{fontSize: '1em'}}>Sign Up</Link>
                </Navbar.Brand>
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