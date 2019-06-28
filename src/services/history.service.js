import { Message } from "element-react";
import request from "./request";

export function getHistory(username) {
  return request({
    url: `/history/${username}`,
    method: "get"
  });
}
