import {arrangeIntoTree} from '../helpers/arrayIntoTree'

export function treeReducer(state={}, action) {
    if(action.type === 'GOT_TREE'){
        return Object.assign({}, state, {
            tree: arrangeIntoTree(action.data.tree)
        })
    }
    return state;
}