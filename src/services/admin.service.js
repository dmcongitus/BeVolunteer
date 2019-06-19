import { Message } from "element-react";
import request from "./request";

export function getAdmins() {
  return request({
    url: `/admins`,
    method: "get"
  });
}

export function getAdminsManger() {
  return request({
    url: `/admins/manager`,
    method: "get"
  });
}

export async function createAdmin(data) {
  return request({
    url: `/admins`,
    method: "post",
    data: data
  });
}

export async function delelteAdmin(username) {
  return request({
    url: `/admins/a/`+username,
    method: "delete",
  });
}
