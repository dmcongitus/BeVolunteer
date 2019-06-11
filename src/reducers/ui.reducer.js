import * as actionTypes from '../constants/actionTypes';

const initialState = {
    currentModal: undefined,
    currentSnackbar: undefined,
    isLoading: true
};

export default function uiReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.OPEN_MODAL:
            return { ...state, currentModal: action.payload };
        
        case actionTypes.CLOSE_MODAL:
            return { ...state, currentModal: undefined };
        
        case actionTypes.OPEN_SNACKBAR:
            return { ...state, currentSnackbar: action.payload };
        
        case actionTypes.CLOSE_SNACKBAR:
            return { ...state, currentSnackbar: undefined };
        
        case actionTypes.GET_ME_SUCCESSFULLY:
            return { ...state, isLoading: false };
    
            case actionTypes.GET_ME_FAILED:
                return { ...state, isLoading: false};

        default:
            return state;
    }
};