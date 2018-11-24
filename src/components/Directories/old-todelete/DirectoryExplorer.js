import React, { Component } from "react";
import { getRepoTreeById} from "../../../actions/actions";
import {RepoDirectory} from "./RepoDirectory";

export class DirectoryExplorer extends Component{

    componentDidMount(){
        this.props.dispatch(getRepoTreeById(this.props.match.params.id))
    }

    render(){
        const directories = this.props.directories;
        // console.log(directories)
        return (
            <div>
                <ul>
                    {directories ? directories.map((d,i) => <RepoDirectory
                        key={i}
                        directory={d}
                        repoId={this.props.match.params.id}
                    />) : ""}
                </ul>
            </div>
        )
    }

}