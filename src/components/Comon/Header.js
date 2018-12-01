import { Navbar } from "react-bootstrap";
import React from "react";
import {AuthLinks} from "./AuthLinks";
import {logoutUser} from "../../actions/userActions";
import {connect} from 'react-redux'
import {UserSearchBox} from "../SearchBoxes/UserSearchBox";
import {SearchBox} from "../SearchBoxes/RepoSearchBoxTest";
import {Link} from "react-router-dom";

const Header = (props) => {
    return (
        <Navbar inverse collapseOnSelect className='header'>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to='/'>repo explorer</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse>
                <UserSearchBox/>
                <SearchBox/>
                <Navbar.Brand >
                    <Link to='/search'>advanced search</Link>
                </Navbar.Brand>
                <AuthLinks
                    loggedInUser={props.loggedInUser }
                    logout={() => props.dispatch(logoutUser())}
                />
            </Navbar.Collapse>
        </Navbar>
    )
};

export const HeaderContainer = connect((state) => {
    return {
        loggedInUser: state.loggedInUser
    }
})(Header);