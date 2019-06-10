import Axios from 'axios';
import request from './request'
import { Message } from 'element-react'
export function createPost(post) {
    return request({
        url: `posts`,
        method: 'post',
        data: post
    })
}

export function deletePost(id) {
    return request({
      url: `/posts/`+id,
      method: 'delete',
    }).then(response => { 
      Message.success("Xóa thành công")
    })
    .catch(error => {
      Message.error("Xóa thất bại")
    });
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

export function reportPost(data) {
    return request({
        url: `reports`,
        method: 'post',
        data: data
    }).then(response => { 
        Message.success("Báo cáo bài viết thành công")
      })
      .catch(error => {
        Message.error("Báo cáo bài viết thất bại")
      });
}


export function getPosts(type) {
    if (type === 0) {
        return request({
            url:`posts`,
            method: 'get'
        })
        //return Axios.get('/posts', { headers: { "x-access-token": localStorage.getItem("token") } });
    } else {
        // return request({
        //     url:`/posts?type=${type}`,
        //     method: 'get'
        // })
        //return Axios.get(`/posts?type=${type}`, { headers: { "x-access-token": localStorage.getItem("token") } });
    }
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



export function getSpecificPost(postId) {
    return request({
        url: `posts/${postId}`,
        method: 'get',
        
    })
}