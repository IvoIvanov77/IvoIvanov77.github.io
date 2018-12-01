import {Nav, NavItem, Navbar} from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";

export const AuthLinks = (props) => {
    if(!props.loggedInUser){
        return (
            <Nav pullRight>
                <Navbar.Brand >
                    <Link to='/login' >sign in</Link>
                </Navbar.Brand>
                <Navbar.Brand >
                    <Link to='/register'>sign up</Link>
                </Navbar.Brand>
            </Nav>
        )
    }else {
        return (
            <Nav pullRight>
                <NavItem onClick={props.logout}>
                    sign out
                </NavItem>
            </Nav>
        )
    }

};