export function fileContentReducer(state = '', action) {
    if(action.type === 'GOT_CONTENT'){
        return action.data;
    }
    return state;
}