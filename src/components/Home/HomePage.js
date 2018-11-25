import React, {Component} from "react";
import {getRepoByOwnerAndRepoName} from "../../actions/actions";
import PaginationItems from "../../pagination/PaginationItems";
import {Redirect} from "react-router-dom";

export class HomePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            userInput: ''
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.onSubmit = this.handleButtonClick.bind(this);
    }

    handleOnChange(e){
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleButtonClick(){
        let params = this.state.userInput.split('/');
        let owner = params[0];
        let repoName = params[1];
        this.props.dispatch(getRepoByOwnerAndRepoName(owner, repoName));

    }

    render() {
        const {repos, ajaxCalls, errorMessage, repo} = this.props;

        const id = repo.id;
        if(id){
            return <Redirect to={`/${repo.owner}/${repo.name}`}/>
        }
        return (
            <div className="home">
                <input value={this.state.userInput} name='userInput' onChange={this.handleOnChange}/>
                <button onClick={this.handleButtonClick}>get repo</button>
                <p>ajax call: {ajaxCalls}</p>
                <p>{this.state.username}</p>
                <p>{errorMessage}</p>
                <h5>{sessionStorage.getItem('username')}</h5>
                <h5>{sessionStorage.getItem('authtoken')}</h5>
                <PaginationItems data={repos ? repos : []}/>
            </div>
        );
    }
}

