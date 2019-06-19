import request from './request'
import { Message } from "element-react";

export function deleteReport(id) {
  return request({
    url: `/reports/`+id,
    method: 'delete',
  }).then(response => { 
    Message.success("Xóa báo cáo thành công")
  })
  .catch(error => {
    Message.error("Xóa báo cáo thất bại")
  });
}

export function getReports() {
    return request({
        url: `reports`,
        method: 'get'
    })
}