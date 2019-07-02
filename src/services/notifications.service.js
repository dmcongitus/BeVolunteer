import request from "./request";
import { Message } from "element-react";
import { getDate, getDay, getYear, getMonth } from "date-fns";



export function getAllCheckinUser(id, username) {
  return request({
    url: `/events/` + id + `/attendances/` + username,
    method: "get"
  });
}

