import '../../styles/homePage.css'
import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import {logoutUser} from "../../actions/userActions";
import {AuthLinks} from "../Comon/AuthLinks";
import { connect } from "react-redux";
import { Navbar } from "react-bootstrap";

class HomePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            userInput: '',
            jump: false,
            search: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.fillForm = this.fillForm.bind(this);
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    fillForm(){
        this.setState({
            userInput: 'IvoIvanov77/repo_explorer',
        })
    }

    onSubmit(e){
        e.preventDefault();
        let params = this.state.userInput.split('/');
        let repoName = params[1];
        if(repoName){
            this.setState({jump:true})
        }else{
            this.setState({search:true})
        }
    }

    render() {
        if(this.state.jump){
            return <Redirect to={`/repo/${this.state.userInput}`}/>
        }
        return (
            <div id="search">
                <Navbar inverse collapseOnSelect className>
                <div className='home-page-navigation'>
                    <Navbar.Header>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <AuthLinks
                            loggedInUser={this.props.loggedInUser }
                            logout={() => this.props.dispatch(logoutUser())}
                        />
                        <Navbar.Brand >
                            <Link to='/search' >advanced search</Link>
                        </Navbar.Brand>
                    </Navbar.Collapse>



                </div>
                </Navbar>

                <form onSubmit={this.onSubmit}>
                    <input
                        type="search"
                        autoFocus={true}
                        name='userInput'
                        value={this.state.userInput}
                        onChange={this.onChange}
                        placeholder="jump to owner/repo"/>
                    <button
                        type="submit"
                        className="btn btn-primary">
                        Explore
                    </button>
                    <button
                        onClick={this.fillForm}
                        className="btn btn-secondary"
                        type="button"
                    >
                        example
                    </button>
                </form>

            </div>
        );
    }
}

export const HomePageContainer = connect((state) => {
    return {
        loggedInUser: state.loggedInUser
    }
})(HomePage);