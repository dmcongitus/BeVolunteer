import * as actionTypes from '../constants/actionTypes';
<<<<<<< .merge_file_a09448
import { storeUserData, setToken } from '../utils/localStorage';
=======
import { setToken } from '../utils/localStorage';
>>>>>>> .merge_file_a01544
import * as authServices from '../services/auth.service';
import * as meServices from '../services/me.service';

export function logInUser(username, password, loginType) {
    return async function (dispatch) {
        try {
            const { data: { token, user } } = await authServices.loginUser(username, password, loginType);

            setToken(token);
<<<<<<< .merge_file_a09448
            storeUserData(user);
=======
>>>>>>> .merge_file_a01544
            dispatch({ type: actionTypes.LOGIN_USER_SUCCESSFUL, payload: { token, user } });
        } catch (e) {
            console.log(e);
            dispatch({ type: actionTypes.LOGIN_USER_FAILED });
        }
    }
}

<<<<<<< .merge_file_a09448
=======
export function getUser() {
    return async function (dispatch) {
        try {
            const { data: user } = await authServices.getUser();
            dispatch({ type: actionTypes.GET_ME_SUCCESSFULLY, payload: { user } });
        } catch (e) {
            console.log(e);
            dispatch({ type: actionTypes.GET_ME_FAILED });
        }
    }
}

>>>>>>> .merge_file_a01544
export function logOutUser() {
    localStorage.clear();
    return { type: actionTypes.LOGOUT_USER };
}

export function updateUser(username, userInfo) {
    return async function (dispatch) {
        try {
            const { data: newUserInfo } = await meServices.updateUserInfo(username, userInfo);

<<<<<<< .merge_file_a09448
            storeUserData(newUserInfo);
=======
>>>>>>> .merge_file_a01544
            dispatch({ type: actionTypes.UPDATE_USER_INFO, payload: newUserInfo });
        } catch (e) {
            console.log(e);
        }
    }
}