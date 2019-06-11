import Axios from "axios";
import request from './request'
import { Message } from "element-react";

export function getAllUsers(q) {
  if(q){
    return request({
      url: `/accounts/?q=`+q,
      method: 'get',
    })
  }
  return request({
    url: `/accounts/`,
    method: 'get',
  })
}

export function getAllOrgs() {
  return request({
    url: `/orgs/`,
    method: 'get',
  })
}
export function getAllUsersRank() {
  return request({
    url: `/ranking`,
    method: 'get',
   
  })
}

export function verifyUser(username) {
  return request({
    url: `/admins/verify/`+ username + `?accept=true`,
    method: 'put',
  }).then(response => { 
    Message.success("Xác thực thành công")
  })
  .catch(error => {
    Message.error("Lỗi")
  });
}

export function getUsersVerify() {
  return request({
    url: `/admins/verify`,
    method: 'get',
  })
}
export function unVerifyUser(username) {
  return request({
    url: `/admins/verify/`+ username + `?accept=false`,
    method: 'put',
  }).then(response => { 
    Message.success("Hủy xác thực thành công")
  })
  .catch(error => {
    Message.error("Lỗi")
  });
}

export function createUser(params) {
  return request({
    url: `/accounts`,
    method: 'post',
    data: {...params}
  }).then(response => { 
    Message.success("Thành công")
  })
  .catch(error => {
    Message.error("Lỗi")
  });

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
      formData.append("verify", identityCard[i]);
    }
    return Axios.post("/accounts/verify", formData, { headers: { "x-access-token": localStorage.getItem("token") } });
}

export function uploadAvatar(username, avatar) {
  const formData = new FormData()
  formData.append("avatar", avatar)
  return Axios.put(`/accounts/u/${username}/avatar`, formData, {headers: {"x-access-token": localStorage.getItem("token")}})
}
