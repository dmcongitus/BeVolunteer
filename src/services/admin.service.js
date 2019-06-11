import Axios from "axios";
import { Message } from "element-react";
import request from "./request";

export function getAdmins() {
  return request({
    url: `/admins`,
    method: "get"
  });
}

const instance = Axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 1000,
  headers: { "x-access-token": localStorage.getItem("token") }
});

export async function createAdmin(data) {
  return request({
    url: `/admins`,
    method: "post",
    data: data
  });
}
