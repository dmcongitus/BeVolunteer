import Axios from 'axios';

export function loginUser(username, password, loginType) {
    return Axios.post(`http://localhost:3000/${loginType ? "admins" : "accounts"}/login`, {username, password})
}

