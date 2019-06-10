import request from './request'

export function loginUser(username, password, loginType) {
    return request({
        url: `${loginType ? "admins" : "accounts"}/login`,
        method: 'post',
        data: { username, password }
    })
}
