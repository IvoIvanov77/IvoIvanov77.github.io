import React, {Component, PureComponent} from "react";
import {getFileContent} from "../../actions/actions";
import Highlight from "react-highlight";
import {getFileExtension} from "../../helpers/getFileExtension";
import ReactMarkdown from "react-markdown";
const HELP_MSG = 'Select A Node To See Its Data Structure Here...';

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
        console.log('render')
        if (!this.props.node && !this.props.content) {
            return <div> {HELP_MSG}</div>;
        }

        if(this.state.fileExtension === 'md'){
            return (
                <div className='content-viewer'>
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