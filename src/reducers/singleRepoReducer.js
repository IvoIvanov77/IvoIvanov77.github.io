export function singleRepoReducer(state = {}, action) {
    if(action.type === 'GOT_SINGLE_REPO'){
        return Object.assign({}, state, action.data);
    }
    return state;
}
