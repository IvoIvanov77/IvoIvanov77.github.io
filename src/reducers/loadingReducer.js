
const initialState = {ajaxCalls: 0, message:''};
export function loadingReducer(state = initialState, action) {
    switch (action.type) {
        case 'START_AJAX_CALL':
            return Object.assign(
                    {}, state, {ajaxCalls: state.ajaxCalls + 1}
                );
        case 'SUCCESS_AJAX_CALL':
            return Object.assign(
                {}, state, {ajaxCalls: state.ajaxCalls - 1}
            );
        case 'FAIL_AJAX_CALL':
            return Object.assign(
                {}, state, {
                    message: action.errorMessage,
                    ajaxCalls: state.ajaxCalls - 1
                }
            );
        default:
            return state;
    }
}