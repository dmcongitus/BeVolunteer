import * as actionTypes from '../constants/actionTypes';
import { storeUserData, setToken } from '../utils/localStorage';
import * as authServices from '../services/auth.service';
import * as meServices from '../services/me.service';

export function logInUser(username, password) {
    return async function (dispatch) {
        try {
            const { 
                data: { token, user } 
                } = await authServices.loginUser(username, password);
            console.log(user);
            setToken(token);
            storeUserData(user);

            dispatch({ 
                type: actionTypes.LOGIN_USER_SUCCESSFUL, 
                payload: { token, user } 
            });
        } catch (e) {
            console.log(e);
            dispatch({ 
                type: actionTypes.LOGIN_USER_FAILED,
                payload: "Login failed"
                
            });
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

            storeUserData(newUserInfo);
            dispatch({ type: actionTypes.UPDATE_USER_INFO, payload: newUserInfo });
        } catch (e) {
            console.log(e);
        }
    }
}