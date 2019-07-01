import * as actionTypes from '../constants/actionTypes';
import { setToken } from '../utils/localStorage';
import * as authServices from '../services/auth.service';
import * as meServices from '../services/me.service';
import * as userServices from '../services/user.service';

export function logInUser(username, password, loginType) {
    return async function (dispatch) {
        try {
            const { data: { token, user } } = await authServices.loginUser(username, password, loginType);

            setToken(token);
            dispatch({ type: actionTypes.LOGIN_USER_SUCCESSFUL, payload: { token, user } });
        } catch (e) {
            console.log(e);
            dispatch({ type: actionTypes.LOGIN_USER_FAILED });
        }
    }
}

export function getUser() {
    return async function (dispatch) {
        try {
            const { data: user } = await authServices.getUser();
            const { data } = await userServices.getNotifications(user.username);
            console.log()
            dispatch({ type: actionTypes.GET_NOTIF, payload: data });
            dispatch({ type: actionTypes.GET_ME_SUCCESSFULLY, payload: { user } });
            
        } catch (e) {
            console.log(e);
            dispatch({ type: actionTypes.GET_ME_FAILED });
        }
    }
}

export function logOutUser() {
    localStorage.clear();
    return { type: actionTypes.LOGOUT_USER };
}

export function updateUser(username, userInfo) {
    return async function (dispatch) {
        try {
            const { data: newUserInfo } = await meServices.updateUserInfo(username, userInfo);

            dispatch({ type: actionTypes.UPDATE_USER_INFO, payload: newUserInfo });
        } catch (e) {
            console.log(e);
        }
    }
}