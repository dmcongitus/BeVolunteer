import Axios from 'axios';

export function getAllUsers() {
    return Axios.get('/accounts/users', { headers: { 'x-access-token': localStorage.getItem('token') } });
}

export function deleteUser(username) {
    return Axios.delete('/accounts/' + username, { headers: { 'x-access-token': localStorage.getItem('token') } });    
}