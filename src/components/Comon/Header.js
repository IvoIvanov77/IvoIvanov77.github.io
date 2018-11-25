import { Navbar } from "react-bootstrap";
import React from "react";
import {AuthLinks} from "./AuthLinks";
import {logoutUser} from "../../actions/userActions";
import {connect} from 'react-redux'
import {SearchBoxContainer} from "../SearchBoxes/UserSearchBox";
import {SearchBox} from "../SearchBoxes/RepoSearchBoxTest";

const Header = (props) => {
    return (
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="/">Repo Explorer</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <SearchBoxContainer/>
            <SearchBox/>
            <Navbar.Collapse>
                {/*<Nav>*/}
                    {/*<NavItem eventKey={1} href="#">*/}
                        {/*Link*/}
                    {/*</NavItem>*/}
                    {/*<NavItem eventKey={2} href="#">*/}
                        {/*Link*/}
                    {/*</NavItem>*/}
                    {/*<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">*/}
                        {/*<MenuItem eventKey={3.1}>Action</MenuItem>*/}
                        {/*<MenuItem eventKey={3.2}>Another action</MenuItem>*/}
                        {/*<MenuItem eventKey={3.3}>Something else here</MenuItem>*/}
                        {/*<MenuItem divider />*/}
                        {/*<MenuItem eventKey={3.3}>Separated link</MenuItem>*/}
                    {/*</NavDropdown>*/}
                {/*</Nav>*/}
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