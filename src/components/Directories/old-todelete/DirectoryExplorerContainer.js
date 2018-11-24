import {DirectoryExplorer} from "./DirectoryExplorer";
import { connect } from "react-redux";

function mapStateToProps(state){
    return{
        directories: state.directories.directories,
        ajaxCalls: state.ajaxObject.ajaxCalls,
        errorMessage: state.ajaxObject.message
    }
}

export const DirectoriesContainer = connect(mapStateToProps)(DirectoryExplorer);