import React, {Component} from 'react';
import {connect} from "react-redux";
import PaginationItems from "../../pagination/PaginationItems";
import {getUserRepos, searchRepos} from "../../actions/actions";

class QuerySearch extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        const queryString = this.props.match.params.queryString;
        const user = this.props.match.params.user;
        console.log(user)
        if(queryString){
            this.props.dispatch(searchRepos(queryString))
        }else if(user){
            this.props.dispatch(getUserRepos(user))
        }

    }

    componentDidUpdate(prevProps){
        if(this.props.match.params !== prevProps.match.params){
            this.componentDidMount()
        }
    }

    render() {
        console.log(this.props)
        const {repos} = this.props;
        return (
            <div className="home">
                <h1>Search</h1>
                <PaginationItems data={repos ? repos : []}/>
            </div>
        );

    }
}

function mapStateToProps(state) {
    return {
        repos: state.foundRepos.items ? state.foundRepos.items : state.userRepos,
    }
}

export const QuerySearchResult = connect(mapStateToProps)(QuerySearch);
