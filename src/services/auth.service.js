import Axios from 'axios';

export function loginUser(username, password, loginType) {
    return Axios.post(`/${loginType ? "admins" : "accounts"}/login`, {username, password})
}

