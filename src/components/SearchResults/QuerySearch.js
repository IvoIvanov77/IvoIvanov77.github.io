import React, {Component} from 'react';
import {connect} from "react-redux";
import PaginationItems from "../pagination/PaginationItems";
import {getUserRepos, searchRepos} from "../../actions/actions";

class QuerySearch extends Component {

    componentDidMount() {
        const queryString = this.props.match.params.queryString;
        const user = this.props.match.params.user;
        if (queryString) {
            this.props.dispatch(searchRepos(queryString))
        } else if (user) {
            this.props.dispatch(getUserRepos(user))
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params !== prevProps.match.params) {
            this.componentDidMount()
        }
    }

    render() {
        const {repos} = this.props;
        return (
            <div className="result">
                <PaginationItems data={repos ? repos : []}/>
            </div>
        );

    }
}

function mapStateToProps(state) {
    return {
        repos: state.repos
    }
}

export const QuerySearchResult = connect(mapStateToProps)(QuerySearch);
