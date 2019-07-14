import * as userServices from "../services/user.service";
import * as actionTypes from "../constants/actionTypes";
import * as authService from "../services/auth.service"

export function verifyUser(identityCard) {
    return async (dispatch, getState) => {
        const { auth: { user } } = getState();
        const { isVerified } = user;
        if (!isVerified) {
            try {
                await userServices.verify(identityCard);
                dispatch({ type: actionTypes.UPDATE_USER_INFO, payload: { ...user, isRequestVerify: true } });
            } catch (err) {
                window.alert("Verify failed" + err);
            }
        }
    }
}

export function uploadAvatar(avatar) {
    return async (dispatch, getState) => {
        const { auth: { user: { username } } } = getState()
        const { data: avatarURL } = await userServices.uploadAvatar(username, avatar)
        dispatch({ type: actionTypes.UPLOAD_AVATAR, payload: avatarURL });
    }
}

export function levelUpUser() {
    return async (dispatch, getState) => {
        // TODO: 
        const { auth: { user: { _id } } } = getState()
        console.log(_id)
        authService.putExp(_id,1)
        dispatch({ type: actionTypes.LEVEL_UP_USER })
    }
}