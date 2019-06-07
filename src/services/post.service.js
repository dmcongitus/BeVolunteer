import Axios from 'axios';
import request from './request'

export function createPost(post) {
    return request({
        url: `posts`,
        method: 'post',
        data: post
    })
}

export function updateImage(id, image) {
    const formData = new FormData();
            for (let i = 0; i < image.length; i++) {
                formData.append('resources', image[i]);
    }
    return request({
        url: `posts/${id}/resources`,
        method: 'put',
        data: formData
    })
}
export function getUserPosts(username) {
    return request({
        url: `accounts/u/` + username +`/posts`,
        method: 'get'
    })
}

// export function createPost(post) {
//     return Axios.post('/posts', post, { headers: { "x-access-token": localStorage.getItem("token") } })
//         .then(({ data: { id } }) => {
//             if (post.image) {
//                 const formData = new FormData();
//                 for (let i = 0; i < post.image.length; i++) {
//                     formData.append('resources', post.image[i]);
//                 }
//                 return Axios.put(`/posts/${id}/resources`, formData, { headers: { "x-access-token": localStorage.getItem("token") } })
//             } else {
//                 return Promise.resolve();
//             }
//         });
// }

export function getPosts(type) {
    if (type === 0) {
        return Axios.get('/posts', { headers: { "x-access-token": localStorage.getItem("token") } });
    } else {
        return Axios.get(`/posts?type=${type}`, { headers: { "x-access-token": localStorage.getItem("token") } });
    }
}

export function getSpecificPost(postId) {
    return request({
        url: `posts/${postId}`,
        method: 'get',
        
    })
}