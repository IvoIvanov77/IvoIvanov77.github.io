import { connect } from "react-redux";
import {HomePage} from "./HomePage";

function mapStateToProps(state){
    return{
        repos: state.userRepos.length ? state.userRepos : state.foundRepos.items,
        repo: state.singleRepo,
        ajaxCalls: state.ajaxObject.ajaxCalls,
        errorMessage: state.ajaxObject.message
    }
}

export const HomePageContainer = connect(mapStateToProps)(HomePage);