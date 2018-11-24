import {Preloader} from "./Preloader";
import { connect } from "react-redux";

function mapStateToProps(state) {
    return {
        loading: state.ajaxObject.ajaxCalls > 0
    }
}

export const PreloaderContainer =  connect(mapStateToProps)(Preloader);
