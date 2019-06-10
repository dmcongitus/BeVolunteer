import Axios from 'axios';
import request from './request'
import { Message } from 'element-react';
export function createEvent(post) {
    return Axios.post('/events', post, { headers: { "x-access-token": localStorage.getItem("token") } })
        .then(({ data: { id } }) => {
            console.log(post.image);
            if (post.image) {
                const formData = new FormData();
                for (let i = 0; i < post.image.length; i++) {
                    formData.append('eventimage', post.image[i]);
                }
                return Axios.put(`/events/${id}/img`, formData, { headers: { "x-access-token": localStorage.getItem("token") } })
            } else {
                return Promise.resolve();
            }
        });
}

export function getEvents(statusEvent) {
    if (statusEvent === 0) {
        return request({
            url: `/events`,
            method: 'get'
        })
        return Axios.get('/events', { headers: { "x-access-token": localStorage.getItem("token") } });
    } else {
        return request({
            url: `/events?statusEvent=${statusEvent}`,
            method: 'get'
        })
    }
}
export function deleteEvent(id) {
    return request({
      url: `/event/`+id,
      method: 'delete',
    }).then(response => { 
      Message.success("Xóa thành công")
    })
    .catch(error => {
      Message.error("Xóa thất bại")
    });
  }
export function getSpecificEvent(eventId) {
    return Axios.get(`/events/${eventId}`, { headers: { "x-access-token": localStorage.getItem("token") } });
}

