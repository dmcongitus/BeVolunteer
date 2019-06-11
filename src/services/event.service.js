import Axios from 'axios';

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
        return Axios.get('/events', { headers: { "x-access-token": localStorage.getItem("token") } });
    } else {
        return Axios.get(`/events?statusEvent=${statusEvent}`, { headers: { "x-access-token": localStorage.getItem("token") } });
    }
}

export function getSpecificEvent(eventId) {
    return Axios.get(`/events/${eventId}`, { headers: { "x-access-token": localStorage.getItem("token") } });
}