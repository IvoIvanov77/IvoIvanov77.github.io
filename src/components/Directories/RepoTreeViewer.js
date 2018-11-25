import {decorators, Treebeard} from "react-treebeard";
import React, {Component} from "react";
import {connect} from 'react-redux'
import {getRepoByOwnerAndRepoName, getRepoTreeById} from "../../actions/actions";
import {ContentViewerContainer} from "../FileContent/ContentViewerContainer";
import styles from '../../styles/treeViewStyles';
import treeStyles from '../../styles/not-default';
import * as filters from "../../helpers/filter";

const README = 'README.MD';


export class TreeViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
        this.onToggle = this.onToggle.bind(this);
        this.onFilterMouseUp = this.onFilterMouseUp.bind(this);
    }


    componentDidMount() {
        const owner = this.props.match.params.owner;
        const repoName = this.props.match.params.repoName;
        this.props.dispatch(getRepoByOwnerAndRepoName(owner, repoName));

    }

    getData = () => {
        const{repo, tree} =this.props;
        return {
            type: 'tree',
            name: repo ? repo.name : 'root',
            toggled: true,
            children: tree

        }
    };

    componentDidUpdate(prevProps) {
        if(this.props.match.params !== prevProps.match.params){
            this.componentDidMount()
        }

        if(this.props.repo !== prevProps.repo){
            const repoId = this.props.repo.id;
            this.props.dispatch(getRepoTreeById(repoId));
        }

        if (this.props.tree !== prevProps.tree) {
            this.setState({data: this.getData()});
        }
    }

    async onFilterMouseUp(e) {
        console.log('loading...')
        const filter = e.target.value.trim();
        if (!filter) {
            return this.setState({data: this.getData()});

        }
        let filtered = filters.filterTree(this.getData(), filter);
        filtered = await filters.expandFilteredNodes(filtered, filter);
        this.setState({data: filtered});
        console.log('end')
    }

    onToggle(node, toggled) {
        if (this.state.cursor) {
            const cursor = this.state.cursor;
            cursor.active = false;
            this.setState({cursor})
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        this.setState({cursor: node});
    }

    render() {
        const data = this.state.data;
        const {tree} = this.props;
        if (!tree) {
            return ''
        }
        const defaultDirectory = tree.find(d => d.path.toUpperCase() === README);
        const defaultPath = defaultDirectory ? defaultDirectory.path : undefined;
        return (
            <div className='tree-viewer-container'>
                <div className='sidebar'>
                    <div style={styles.searchBox}>
                        <div className="input-group">
                            <span className="input-group-addon">
                              <i className="fa fa-filter"/>
                            </span>
                            <input className="form-control"
                                   onKeyUp={this.onFilterMouseUp}
                                   placeholder="filter..."
                                   type="text"/>
                        </div>
                    </div>
                    <Treebeard
                        data={data}
                        onToggle={this.onToggle}
                        decorators={this.props.decorators}
                        style={treeStyles}
                    />
                </div>
                <div className='content-viewer-container'>
                    <ContentViewerContainer
                        style={styles.viewer.base}
                        node={this.state.cursor}
                        repoId={this.props.repo.id}
                        defaultPath={defaultPath}
                    />
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        tree: state.directories.tree,
        repo: state.singleRepo,
        decorators
    }
}

export const RepoTreeViewer = connect(mapStateToProps)(TreeViewer);