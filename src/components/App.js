import React, {Component} from "react";
import {PreloaderContainer} from "./Preloader/PreloaderContainer";
import {Route, Switch} from "react-router-dom";
import {RepoTreeViewerById} from "./Directories/GetRepoById/TreeViewerContianer";
import {RegistrationFormContainer} from "./Forms/RegistrationForm";
import {LoginFormContainer} from "./Forms/LoginForm";
import {HeaderContainer} from "./Comon/Header";
import {RepoTreeViewer} from "./Directories/RepoTreeViewer";
import {AdvancedSearchForm} from "./Forms/AdvancedSearchForm";
import {HomePage} from "./Home/HomePage";
import {QuerySearchResult} from "./SearchResults/QuerySearch";

export class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            username:''
        };
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(e){
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="App">
                <HeaderContainer/>
                <PreloaderContainer/>
                <Switch>
                    <Route exact path="/repository/:id" component={RepoTreeViewerById} />
                    <Route exact path="/register" component={RegistrationFormContainer} />
                    <Route exact path="/login" component={LoginFormContainer} />
                    <Route exact path="/repo/:owner/:repoName" component={RepoTreeViewer} />
                    <Route exact path="/repos/:queryString" component={QuerySearchResult} />
                    <Route exact path="/:user/repos" component={QuerySearchResult} />
                    <Route path="/search" component={AdvancedSearchForm} />
                </Switch>
            </div>
        );
}

}