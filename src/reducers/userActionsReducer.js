const initialState = !!sessionStorage.getItem('authtoken');
export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'GOT_USER_DATA':
            return true;

        case 'CLEAR_USER_DATA':
            return false;

        default:
            return state;
    }
}

