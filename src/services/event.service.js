import Axios from 'axios';

export function createEvent(event) {
    return Axios.post('/events', event, { headers: { "x-access-token": localStorage.getItem("token") } })
        .then(({ data: { id } }) => {
            console.log(event.image);
            if (event.image) {
                const formData = new FormData();
                for (let i = 0; i < event.image.length; i++) {
                    formData.append('eventimage', event.image[i]);
                }
                return Axios.put(`/events/${id}/img`, formData, { headers: { "x-access-token": localStorage.getItem("token") } })
            } else {
                return Promise.resolve();
            }
        });
}

export function getEvents(statusEvent) {
    if (statusEvent === 0) {
        return Axios.get('/events', { headers: { "x-access-token": localStorage.getItem("token") } });
    } else {
        return Axios.get(`/events?statusEvent=${statusEvent}`, { headers: { "x-access-token": localStorage.getItem("token") } });
    }
}

export function getSpecificEvent(eventId) {
    return Axios.get(`/events/${eventId}`, { headers: { "x-access-token": localStorage.getItem("token") } });
}