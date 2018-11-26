import React, {Component} from 'react';
import {connect} from "react-redux";
import PaginationItems from "../../pagination/PaginationItems";
import {searchRepos} from "../../actions/actions";

class QuerySearch extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        const queryString = this.props.match.params.queryString;
        this.props.dispatch(searchRepos(queryString))
    }

    // componentDidUpdate(prevProps){
    //     if(this.props.repos !== prevProps.repos){
    //
    //     }
    // }

    render() {
        console.log(this.props)
        const {repos} = this.props;
        return (
            <div className="home">
                <h1>Search</h1>
                <PaginationItems data={repos.items ? repos.items : []}/>
            </div>
        );

    }
}

function mapStateToProps(state) {
    return {
        repos: state.foundRepos,
    }
}

export const QuerySearchResult = connect(mapStateToProps)(QuerySearch);
