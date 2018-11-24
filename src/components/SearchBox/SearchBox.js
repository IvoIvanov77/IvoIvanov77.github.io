import React, {Component} from "react";
import {getRepoByOwnerAndRepoName, getReposWithLinks} from "../../actions/actions";
import {connect} from "react-redux"
import {Redirect} from "react-router-dom";

class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: '',
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
        const {dispatch} =this.props;
        const {owner} = this.state;
        dispatch(getReposWithLinks(owner));
        this.setState({redirect:true})

    }

    render() {
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
                            placeholder="Search"
                            name="owner"
                            style={{backgroundColor: '#404448'}}
                            value={this.state.owner}
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
            </div>
        );
    }
}

export const SearchBoxContainer = connect()(SearchBox);