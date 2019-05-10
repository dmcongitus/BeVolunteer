import Axios from 'axios';

export function loginUser(username, password, loginType) {
    return Axios.post(`https://bevolunteers.herokuapp.com/${loginType ? "admins" : "accounts"}/login`, {username, password})
}

