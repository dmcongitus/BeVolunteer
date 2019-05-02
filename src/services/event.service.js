import Axios from 'axios';

export function createEvent(post) {
    return Axios.post('/events', post, { headers: { "x-access-token": localStorage.getItem("token") } })
        .then(({ data: { id } }) => {
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
        return Axios.get('/events', { headers: { "x-access-token": localStorage.getItem("token") } });
    } else {
        return Axios.get(`/events?statusEvent=${statusEvent}`, { headers: { "x-access-token": localStorage.getItem("token") } });
    }
}

export function getSpecificPost(postId) {
    return Axios.get(`/events/${postId}`, { headers: { "x-access-token": localStorage.getItem("token") } });
}