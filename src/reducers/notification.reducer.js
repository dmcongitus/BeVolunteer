import * as actionTypes from '../constants/actionTypes';

const initialState = {
    notifications: []
};

export default function uiReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_NOTIF:
            return { ...state, notifications: action.payload };

        case actionTypes.APPEND_NOTIF:
            return { ...state, notifications: [action.payload, ...state.notifications] };

        default:
            return state;
    }
};