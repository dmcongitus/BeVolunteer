import * as userServices from "../services/user.service";
import * as actionTypes from "../constants/actionTypes";

export function verifyUser(identityCard) {
<<<<<<< .merge_file_a00228
    if (!identityCard) {
        return;
    }

=======
>>>>>>> .merge_file_a08556
    return async (dispatch, getState) => {
        const { auth: { user } } = getState();
        const { isVerified } = user;    
        if (!isVerified) {
            try {
                await userServices.verify(identityCard);
<<<<<<< .merge_file_a00228
                dispatch({ type: actionTypes.UPDATE_USER_INFO, payload: {...user, isVerified: true} });
=======
                dispatch({ type: actionTypes.UPDATE_USER_INFO, payload: {...user, isRequestVerify: true} });
>>>>>>> .merge_file_a08556
            } catch(err) {
                window.alert("Verify failed" + err);
            }
        }
    }
<<<<<<< .merge_file_a00228
=======
}

export function uploadAvatar(avatar) {
    return async (dispatch, getState) => {
        const {auth:{user:{username}}} = getState()
        const {data: avatarURL} = await userServices.uploadAvatar(username, avatar)
        dispatch({type: actionTypes.UPLOAD_AVATAR, payload: avatarURL});
    }
>>>>>>> .merge_file_a08556
}