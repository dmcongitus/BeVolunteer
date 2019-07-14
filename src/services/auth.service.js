import request from './request'
import { Message } from 'element-react';
export function loginUser(username, password, loginType) {
    return request({
        url: `${loginType ? "admins" : "accounts"}/login`,
        method: 'post',
        data: { username, password }
    })
    .catch(error => {
        return request({
            url: `/admins/login`,
            method: 'post',
            data: { username, password }
        }).catch(error => {
            Message.error("Thất bại");
        })
    });
}

export function getUser(username, password, loginType) {
    return request({
        url: `/me`,
        method: 'get'
    })
}

export function putExp(id, point) {
    return request({
        url: `/exp/`+id,
        method: 'put',
        data: point
    })
}