import {Treebeard} from "react-treebeard";
import React, {Component} from "react";

import {getRepoTreeById} from "../../../actions/actions";
import {ContentViewerContainer} from "../../FileContent/ContentViewerContainer";
import styles from '../../../styles/treeViewStyles';
import treeStyles from '../../../styles/not-default';
import * as filters from "../../../helpers/filter";

const README = 'README.MD';
///repository/158962472

export class TreeViewerById extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
        this.onToggle = this.onToggle.bind(this);
        this.onFilterMouseUp = this.onFilterMouseUp.bind(this);
    }


    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.dispatch(getRepoTreeById(id));
    }

    getData = () => {
        return {
            type: 'tree',
            name: 'temp',
            toggled: true,
            children: this.props.tree

        }
    };

    componentDidUpdate(prevProps) {
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
            return null
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
                        repoId={this.props.match.params.id}
                        defaultPath={defaultPath}
                    />
                </div>
            </div>

        );
    }
}

// function mapStateToProps(state) {
//     return {
//         tree: state.directories.tree
//     }
// }
//
// export const RepoTreeViewer = connect(mapStateToProps)(TreeViewer);