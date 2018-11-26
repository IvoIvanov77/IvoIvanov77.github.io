export function reposBySearchCriteria(state = {}, action) {
    if(action.type === 'GOT_FOUND_REPOS'){
        return action.data;
    }
    return state;
}
