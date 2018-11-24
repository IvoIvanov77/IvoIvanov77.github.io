export function reposByOwnerReducer(state = [], action) {
    if(action.type === 'GOT_USER_REPOS'){
        return action.data;
    }
    return state;
}
