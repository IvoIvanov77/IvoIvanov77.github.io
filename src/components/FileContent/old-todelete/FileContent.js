import React, {Component} from "react";
import {getFileContent} from "../../../actions/actions";


export class Content extends Component{

    componentDidMount(){
        const repoId = this.props.location.state.repoId;
        const path = this.props.location.state.directoryPath;
        this.props.dispatch(getFileContent(repoId, path));
    }

    render(){
        return (
            <div>
                <pre>{this.props.content}</pre>
            </div>
        );
    }

}