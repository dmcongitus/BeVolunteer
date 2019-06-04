import Axios from "axios";
import request from './request'

export function getAllUsers() {
  return request({
    url: `/accounts/`,
    method: 'get',
   
  })
}

export function getAllUsersRank() {
  return request({
    url: `/rankings/`,
    method: 'get',
   
  })
}

export function verifyUser(username) {
  return request({
    url: `/admins/verify/`+ username,
    method: 'put',
  })
}

export function unVerifyUser(username) {
  return request({
    url: `/admins/unverify/`+ username,
    method: 'put',
  })
}




const instance = Axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000,
  headers: { "x-access-token": localStorage.getItem("token") }
});

export async function banUser(username) {
  return await instance.post("/admins/ban/" + username);
}
export async function unbanUser(username) {
  return await instance.post("/admins/unban/" + username);
}



export function verify(identityCard) {
    let formData = new FormData()
    for (let i = 0; i < identityCard.length; i++){
        formData.append("resourceVerify", identityCard[i]);
    }
    return Axios.post("/accounts/verify", formData, { headers: { "x-access-token": localStorage.getItem("token") } });
}

export async function createUser(params) {
  try {
    const data = await Axios.post("/accounts", { ...params });
    return data; 
  } catch (e) {
      throw e;
  }
}