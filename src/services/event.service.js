import request from "./request";
import { Message } from "element-react";
import { getDate, getDay, getYear, getMonth } from "date-fns";

export function createEvent(event) {
  return request({
    url: `/events`,
    method: "post",
    data: event
  }).then(({ data: { _id } }) => {
    if (event.image) {
      const formData = new FormData();
      for (let i = 0; i < event.image.length; i++) {
        formData.append("resources", event.image[i]);
      }
      return request({
        url: `/events/${_id}/resources`,
        method: "put",
        data: formData
      });
    } else {
      return Promise.resolve();
    }
  });
}

export function editEvent(event) {
  return request({
    url: `/events/${event._id}`,
    method: "put",
    data: event
  }).then(async ({ data: { _id } }) => {
    if (event.image) {
      const formData = new FormData();
      for (let i = 0; i < event.image.length; i++) {
        if (typeof event.image[i] === "string")  {
          let res = await request({
            url: `/resources/${event.image[i]}`,
            method: "get",
            responseType: "blob"
          
          });
          let file = new File([res.data], event.image[i], {
            type: res.data.type
          });
          formData.append("resources", file);
        } else {
          formData.append("resources", event.image[i]);
        }
      }
      return request({
        url: `/events/${_id}/resources`,
        method: "put",
        data: formData
      
      });
    } else {
      return Promise.resolve();
    }
  });
}

export function getEvents(statusEvent) {
  if (statusEvent === 0) {
    return request({
      url: `/events`,
      method: "get"
    });
  } else {
    return request({
      url: `/events?statusEvent=${statusEvent}`,
      method: "get"
    });
  }
}
export function deleteEvent(id) {
  return request({
    url: `/event/` + id,
    method: "delete"
  })
    .then(response => {
      Message.success("Xóa thành công");
    })
    .catch(error => {
      Message.error("Xóa thất bại");
    });
}

export function getSpecificEvent(eventId) {
  return request({
    url: `/events/${eventId}`,
    method: "get"
  })
}

export function joinEvent(id) {
  return request({
    url: `/events/` + id + `/join`,
    method: "put"
  })
    .then(response => {
      Message.success("Thành công");
    })
    .catch(error => {
      Message.error("Thất bại");
    });
}

export function unjoinEvent(id) {
  return request({
    url: `/events/` + id + `/unjoin`,
    method: "put"
  })
    .then(response => {
      Message.success("Thành công");
    })
    .catch(error => {
      Message.error("Thất bại");
    });
}

export function getEventJoined(username) {
  return request({
    url: `/accounts/u/` + username + `/eventsjoin`,
    method: "get"
  });
}

//Lấy danh sách event đã tạo bởi username
export function getEventCreatedBy(username) {
  return request({
    url: `/admins/a/` + username + `/events`,
    method: "get"
  });
}

export function getEventByID(id) {
  return request({
    url: `/events/` + id,
    method: "get"
  });
}

export function startEventByID(id) {
  return request({
    url: `/events/` + id + `/start`,
    method: "put"
  });
}

export function getCheckinByDate(id, date) {
  return request({
    url: `/events/` + id + `/attendances?date=` + date,
    method: "get"
  });
}
export function createCheckinByDate(id, date) {
  return request({
    url: `/events/` + id + `/attendances?date=` + date,
    method: "post"
  });
}

export function CheckinUserByHost(id, idCheckin) {
  return request({
    url: `/events/` + id + `/attendances/` + idCheckin,
    method: "put"
  });
}
export function CheckinUserByCode(id, idCheckin, code) {
  return request({
    url: `/events/` + id + `/attendances/` + idCheckin,
    method: "put",
    data: { code: code }
  });
}

export function getCheckinByDateUser(id, date, username) {
  return request({
    url: `/events/` + id + `/attendances/` + username + `?date=` + date,
    method: "get"
  });
}

export function getAllCheckinUser(id, username) {
  return request({
    url: `/events/` + id + `/attendances/` + username,
    method: "get"
  });
}

export function donateMoney(id, value) {
  return request({
    url: `/events/` + id + `/donates`,
    method: "post",
    data : {
      value: value
    }
  });
}

export function getDonateEvent(id) {
  return request({
    url: `/events/` + id + `/donates`,
    method: "get",
  });
}
