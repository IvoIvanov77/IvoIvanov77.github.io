import React, {Component} from "react";
import {getFileContent} from "../../actions/actions";
import Highlight from "react-highlight";
import {getFileExtension} from "../../helpers/getFileExtension";
import ReactMarkdown from "react-markdown";
const HELP_MSG = 'This repository has no Readme. Please select a file to see its content here...';

export class ContentViewer extends Component{

    constructor(props){
        super(props);
        this.state = {
            fileExtension: ''        }

    }

    componentDidMount(){
        if(this.props.defaultPath){
            this.props.dispatch(
                getFileContent(this.props.repoId, this.props.defaultPath)
            );
            this.setState({fileExtension: 'md'})
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.repoId !== prevProps.repoId) {
            this.componentDidMount();
        }else if (this.props.node !== prevProps.node) {
            if(this.props.node && this.props.node.type !== 'tree'){
                this.props.dispatch(
                    getFileContent(this.props.repoId, this.props.node.path));
                this.setState({fileExtension: getFileExtension(this.props.node.name)})
            }
        }
    }

    render(){
        if (!this.props.node && !this.props.content) {
            return <div> {HELP_MSG}</div>;
        }

        if(this.state.fileExtension === 'md'){
            return (
                <div className='readme-viewer'>
                    <ReactMarkdown source={this.props.content} />
                </div>
            )
        }
        return (
            <div className='content-viewer'>
                <Highlight
                    className={this.state.fileExtension}
                >
                    {this.props.content}
                </Highlight>
            </div>
        );
    }
}