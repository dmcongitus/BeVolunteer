import Axios from 'axios';
import { getToken } from '../utils/localStorage';
import request from './request'
import { Message } from 'element-react';
/**
 * Update user's info
 * @param {Object} userInfo User's information
 */
export function updateUserInfo(username, userInfo) {
    return request({
        url: `/accounts/u/` + username,
        method: 'put',
       data: userInfo
    })
    // return Axios.put('/accounts/u/' + username,
    //     userInfo, {
    //         headers: {
    //             "x-access-token": getToken()
    //         }
    //     })
    .then(Message.success("Cập nhật thành công"));
}

/**
 * Get user's info
 * @param {String} username User's username
 */
export function getUserInfo(username) {
    return Axios.get();
}

export function getMyPosts(userId) {
    return request({
        url: `/posts/user/${userId}`,
        method: 'get',
       
    })
    // return Axios.get(`/posts/user/${userId}`, { headers: { "x-access-token": localStorage.getItem("token") } } );
}