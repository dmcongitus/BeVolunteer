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