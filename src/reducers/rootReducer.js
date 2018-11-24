import {reposByOwnerReducer} from "./reposByOwnerReducer";
import {loadingReducer} from "./loadingReducer";
import {treeReducer} from "./treeReducer";
import {fileContentReducer} from "./fileContentReducer";
import {userReducer} from "./userActionsReducer";
import {singleRepoReducer} from "./singleRepoReducer";
import {reposBySearchCriteria} from "./reposBySerchCriteria";

export const rootReducer = {
    userRepos: reposByOwnerReducer,
    foundRepos: reposBySearchCriteria,
    directories: treeReducer,
    fileContent: fileContentReducer,
    ajaxObject: loadingReducer,
    loggedInUser: userReducer,
    singleRepo: singleRepoReducer
};
