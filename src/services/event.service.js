import Axios from 'axios';
import request from "./request";
import { Message } from "element-react";

export function createEvent(event) {
    console.log(event);
    return Axios.post('/events', event, { 
        headers: { 
                "x-access-token": localStorage.getItem("token") 
            } 
        }
    ).then(({ data: { _id } }) => {
            if (event.image) {
                const formData = new FormData();
                for (let i = 0; i < event.image.length; i++) {
                    formData.append('resources', event.image[i]);
                }
                return Axios.put(`/events/${_id}/resources`, formData, { headers: { "x-access-token": localStorage.getItem("token") } })
            } else {
                return Promise.resolve();
            }
        }
    );
}

export function editEvent(event) {
    console.log("Log event");
    console.log(event);
    return Axios.put(`/events/${event._id}`, event, { 
        headers: { 
                "x-access-token": localStorage.getItem("token") 
            } 
        }
    ).then(async ({ data: { _id } }) => {
            if (event.image) {
                const formData = new FormData();
                for (let i = 0; i < event.image.length; i++) {
                        if (typeof event.image[i] === 'string') {
                        let res = await Axios.get(`http://172.104.39.161:3000/resources/${event.image[i]}`, {
                            responseType: 'blob',
                        })
                        let file = new File([res.data], event.image[i], {
                            type: res.data.type
                        })
                        formData.append('resources', file);
                    } else {
                        console.log(event.image[i])
                        formData.append('resources', event.image[i]);
                    }
                }
                return Axios.put(`/events/${_id}/resources`, formData, { headers: { "x-access-token": localStorage.getItem("token") } })
            } else {
                return Promise.resolve();
            }
        }
    );
}


export function getEvents(statusEvent) {
    if (statusEvent === 0) {
        return request({
            url: `/events`,
            method: "get"
        });
        return Axios.get("/events", {
            headers: { "x-access-token": localStorage.getItem("token") }
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
  return Axios.get(`/events/${eventId}`, {
    headers: { "x-access-token": localStorage.getItem("token") }
  });
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
      url: `/accounts/u/`+username+`/eventsjoin`,
      method: "get"
    })
}