export function reposReducer(state = [], action) {
    if(action.type === 'GOT_USER_REPOS'){
        return action.data;
    }
    if(action.type === 'GOT_FOUND_REPOS'){
        return action.data.items;
    }
    return state;
}
