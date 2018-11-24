import {ContentViewer} from "./ContentViewer";
import { connect } from "react-redux";

function mapStateToProps(state){
    return{
        content: state.fileContent,
        ajaxCalls: state.ajaxObject.ajaxCalls,
        errorMessage: state.ajaxObject.message
    }
}

export const ContentViewerContainer = connect(mapStateToProps)(ContentViewer);