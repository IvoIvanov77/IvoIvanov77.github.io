import {loadingReducer} from "./loadingReducer";
import {treeReducer} from "./treeReducer";
import {fileContentReducer} from "./fileContentReducer";
import {userReducer} from "./userActionsReducer";
import {singleRepoReducer} from "./singleRepoReducer";
import {reposReducer} from "./reposrReducer";

export const rootReducer = {
    repos: reposReducer,
    directories: treeReducer,
    fileContent: fileContentReducer,
    ajaxObject: loadingReducer,
    loggedInUser: userReducer,
    singleRepo: singleRepoReducer
};
