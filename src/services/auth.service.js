import Axios from 'axios';

export function loginUser(username, password) {
    return Axios.post(`/accounts/login`, {username, password})
}