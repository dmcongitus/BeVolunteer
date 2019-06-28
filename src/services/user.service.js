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

export function getNotifications(userID) {
  return request({url:`/notification/${userID}`, method:'get'})
}



export async function banUser(username) {
  return request({
    url: `/admins/ban/` + username,
    method: 'put'
  }).then(response => { 
    Message.success("Khóa thành công")
  })
  .catch(error => {
    Message.error("Lỗi")
  });

}
export async function unbanUser(username) {
  return request({
    url: `/admins/unban/` + username,
    method: 'put'
  }).then(response => { 
    Message.success("Mở khóa thành công")
  })
  .catch(error => {
    Message.error("Lỗi")
  });
}



export function verify(identityCard) {
    let formData = new FormData()
    for (let i = 0; i < identityCard.length; i++){
      formData.append("verify", identityCard[i]);
    }
    return request({
      url: `/accounts/verify`,
      method: 'post',
      data: formData
    })
}

export function uploadAvatar(username, avatar) {
  const formData = new FormData()
  formData.append("avatar", avatar)
  return request({
    url: `/accounts/u/${username}/avatar`,
    method: 'put',
    data: formData
  })
}
