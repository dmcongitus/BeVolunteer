import * as actionTypes from '../constants/actionTypes';

const initialState = {
    isAuthenticated: false,
    user: undefined
};


export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.LOGIN_USER_SUCCESSFUL:
            return { ...state, isAuthenticated: true, ...action.payload };

        case actionTypes.LOGIN_USER_FAILED:
            return { ...state, isAuthenticated: false, user: {} };
        
        case actionTypes.LOGOUT_USER:
            return { ...state, isAuthenticated: false, user: undefined };
        
        case actionTypes.UPDATE_USER_INFO:
            return { ...state, user: { ...state.user} };
        
        case actionTypes.UPLOAD_AVATAR:
            const user = state.user
            user.avatar = action.payload
            return {...state, user}

        case actionTypes.GET_ME_SUCCESSFULLY:
            return { ...state, isAuthenticated: true, ...action.payload };

        case actionTypes.GET_ME_FAILED:
                return { ...state, isAuthenticated: false, user: {} };

        default:
            return state;
    }
}