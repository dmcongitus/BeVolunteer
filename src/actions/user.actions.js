import * as userServices from "../services/user.service";
import * as actionTypes from "../constants/actionTypes";

export function verifyUser(identityCard) {
    if (!identityCard) {
        return;
    }

    return async (dispatch, getState) => {
        const { auth: { user } } = getState();
        const { isVerified } = user;    
        if (!isVerified) {
            try {
                await userServices.verify(identityCard);
                dispatch({ type: actionTypes.UPDATE_USER_INFO, payload: {...user, isVerified: true} });
            } catch(err) {
                window.alert("Verify failed" + err);
            }
        }
    }
}

export function uploadAvatar(avatar) {
    return async (dispatch, getState) => {
        const {auth:{user:{username}}} = getState()
        const {data: avatarURL} = await userServices.uploadAvatar(username, avatar)
        dispatch({type: actionTypes.UPLOAD_AVATAR, payload: avatarURL});
    }
}