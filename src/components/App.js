import React, {Component} from "react";
import {PreloaderContainer} from "./Preloader/PreloaderContainer";
import {Route, Switch} from "react-router-dom";
import {DirectoriesContainer} from "./Directories/old-todelete/DirectoryExplorerContainer";
import {HomePageContainer} from "./Repos/HomePageContainer";
import {FileContentContainer} from "./FileContent/old-todelete/FileContentConteiner";
import {RepoTreeViewer} from "./Directories/TreeViewerContianer";
import {RegistrationFormContainer} from "./Forms/RegistrationForm";
import {LoginFormContainer} from "./Forms/LoginForm";
import {HeaderContainer} from "./Comon/Header";
import {RepoTreeViewerTest} from "./Directories/RepoTreeViewerTest";
import {AdvancedSearchContainer} from "./Forms/AdvancedSearchForm";




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
                    <Route exact path="/" component={HomePageContainer} />
                    <Route path="/content" component={FileContentContainer} />
                    <Route exact path="/repository/:id" component={RepoTreeViewer} />
                    <Route exact path="/:owner/:repoName" component={RepoTreeViewerTest} />
                    <Route path="/register" component={RegistrationFormContainer} />
                    <Route path="/login" component={LoginFormContainer} />
                    <Route path="/search" component={AdvancedSearchContainer} />
                </Switch>
            </div>
        );
}

}