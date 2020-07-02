const initialState = {
    feedBackList: [],
    responseMessage: "",
    responseVariant: ""
}

const feedBackReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_FEEDBACKS_SUCCESS':
            return {
                feedBackList: action.payload
            }
        case 'FETCH_FEEDBACKS_FAILURE':
            return {
                ...state,
                responseMessage: action.payload.message,
                responseVariant: action.payload.variant
            }
        case 'SEARCH_FEEDBACK':
            return {
                ...state,
                feedBackList: state.feedBackList.filter((item) => item.email === action.payload)
            }
        case 'SUCCESS_SAVE_FEEDBACK':
            return {
                ...state,
                responseMessage: action.payload.message,
                responseVariant: action.payload.variant
            }
        case 'FAILURE_SAVE_FEEDBACK':
            return {
                ...state,
                responseMessage: action.payload.message,
                responseVariant: action.payload.variant
            }
        case 'HIDE_FEEDBACK_MESSAGE':
            return {
                ...state,
                responseMessage: "",
                responseVariant: ""
            }
        case 'SHOW_ERROR_MESSAGE':
            return {
                ...state,
                responseMessage: action.payload.message,
                responseVariant: action.payload.variant
            }
        default:
            return state
    }
};
export default feedBackReducer;