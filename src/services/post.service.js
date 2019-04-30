import Axios from 'axios';

export function createPost(post) {
    return Axios.post('/posts', post, { headers: { "x-access-token": localStorage.getItem("token") } })
        .then(({ data: { id } }) => {
            if (post.image) {
                const formData = new FormData();
                formData.append('postimage', post.image);
                return Axios.put(`/posts/${id}/img`, formData, { headers: { "x-access-token": localStorage.getItem("token") } })
            } else {
                return Promise.resolve();
            }
        });
}

export function getPosts(type) {
    if (type === 0) {
        return Axios.get('/posts', { headers: { "x-access-token": localStorage.getItem("token") } });
    } else {
        return Axios.get(`/posts?type=${type}`, { headers: { "x-access-token": localStorage.getItem("token") } });
    }
}

export function getSpecificPost(postId) {
    return Axios.get(`/posts/${postId}`, { headers: { "x-access-token": localStorage.getItem("token") } });
}