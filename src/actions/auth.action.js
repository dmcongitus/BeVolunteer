import * as actionTypes from '../constants/actionTypes';
import { storeUserData } from '../utils/localStorage';
import * as authServices from '../services/auth.service';

export function logInUser(username, password) {
    return async function (dispatch) {
        try {
            const { data: { token, user } } = await authServices.loginUser(username, password);
            storeUserData(user);
            dispatch({ type: actionTypes.LOGIN_USER_SUCCESSFUL, payload: { token, user } });
        } catch (e) {
            console.log(e);
            dispatch({ type: actionTypes.LOGIN_USER_FAILED });
        }
    }
}

export function logOutUser() {
    localStorage.clear();
    return { type: actionTypes.LOGOUT_USER };
}