import React, {Component} from "react";
import {connect} from "react-redux"
import {Redirect} from "react-router-dom";

class RepoSearchBoxTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: '',
            owner: '',
            repo: '',
            redirect:false

        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleOnChange(e) {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        const [owner, repo] = this.state.userInput.split('/');
        this.setState({
            owner,
            repo,
            redirect:true,
            userInput: ''
        })

    }

    render() {
        const {redirect, owner, repo} = this.state;
        return (
            <div className="col-sm-3 col-md-3">
                <form
                    className="navbar-form"
                    role="search"
                    onSubmit={this.onSubmit}
                >
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="owner/repo"
                            name="userInput"
                            value={this.state.userInput}
                            onChange={this.handleOnChange}
                        />
                        <div className="input-group-btn">
                            <button
                                className="btn btn-default"
                                type="submit"
                            >
                                <i className="glyphicon glyphicon-search"/>
                            </button>
                        </div>
                    </div>
                </form>
                {redirect && <Redirect to={`/repo/${owner}/${repo}`}/>}
            </div>
        );
    }
}

export const SearchBox = connect()(RepoSearchBoxTest);