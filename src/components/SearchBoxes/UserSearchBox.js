import React, {Component} from "react";
import {Redirect} from "react-router-dom";

export class UserSearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: '',
            owner: '',
            redirect: false

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
        const {userInput} = this.state;
        this.setState({owner: userInput, redirect:true, userInput:''})

    }

    render() {
        const{owner, redirect} = this.state;
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
                            placeholder="github user"
                            name="userInput"
                            style={{backgroundColor: '#404448'}}
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
                {redirect && <Redirect to={`/${owner}/repos`}/>}
            </div>
        );
    }
}

