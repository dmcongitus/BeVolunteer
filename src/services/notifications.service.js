import request from "./request";
import { Message } from "element-react";



export function readNotification(id) {
  return request({
    url: `/notification/` + id,
    method: "put"
  });
}

