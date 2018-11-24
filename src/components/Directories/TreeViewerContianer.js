import React from 'react'
import {TreeViewer} from "./RepoTreeViewer";
import {decorators} from "react-treebeard";
import { connect } from "react-redux";
import {getFileExtension} from "../../helpers/getFileExtension";

decorators.Header = ({style, node}) => {
    if(!node.name){
        node.name = '.blank'
    }
    const iconType = node.type === 'tree' ? 'folder' : getFileExtension(node.name);
    const iconClass = `fiv-sqo fiv-icon-${iconType} fiv-sqo fiv-icon-blank`;
    const iconStyle = {
        marginRight: '5px',
        fontSize: '18px'
    };
    return (
        <div style={style.base}>
            <div style={style.title}>
                <i className={iconClass} style={iconStyle}/>
                {node.name}
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        tree: state.directories.tree,
        repo: state.singleRepo,
        decorators
    }
}

export const RepoTreeViewer = connect(mapStateToProps)(TreeViewer);