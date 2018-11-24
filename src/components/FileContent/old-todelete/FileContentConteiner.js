import {Content} from "./FileContent";
import { connect } from "react-redux";

function mapStateToProps(state){
    return{
        content: state.fileContent,
        ajaxCalls: state.ajaxObject.ajaxCalls,
        errorMessage: state.ajaxObject.message
    }
}

export const FileContentContainer = connect(mapStateToProps)(Content);