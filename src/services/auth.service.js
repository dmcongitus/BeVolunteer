import Axios from 'axios';

export function loginUser(username, password, loginType) {
    return Axios.post(`http://172.104.39.161:3000/${loginType ? "admins" : "accounts"}/login`, {username, password})
}

