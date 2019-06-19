import request from "./request";
import { Message } from "element-react";

export function getCommentPost(id) {
  return request({
    url: `/events/${id}/comments`,
    method: "get"
  });
}

export function createPost(post) {
  return request({
    url: `posts`,
    method: "post",
    data: post
  });
}

export function deletePost(id) {
  return request({
    url: `/posts/` + id,
    method: "delete"
  })
    .then(response => {
      Message.success("Xóa thành công");
    })
    .catch(error => {
      Message.error("Xóa thất bại");
    });
}
export function updateImage(id, image) {
  const formData = new FormData();
  for (let i = 0; i < image.length; i++) {
    formData.append("resources", image[i]);
  }
  return request({
    url: `posts/${id}/resources`,
    method: "put",
    data: formData
  });
}
export function getUserPosts(username) {
  return request({
    url: `accounts/u/` + username + `/posts`,
    method: "get"
  });
}

export function reportPost(data) {
  return request({
    url: `reports`,
    method: "post",
    data: data
  })
    .then(response => {
      Message.success("Báo cáo bài viết thành công");
    })
    .catch(error => {
      Message.error("Báo cáo bài viết thất bại");
    });
}

export function getPosts(type) {
  if (type === 0) {
    return request({
      url: `posts`,
      method: "get"
    });
  }
}

export function getSpecificPost(postId) {
  return request({
    url: `posts/${postId}`,
    method: "get"
  });
}

export function getSpecificEvents(postId) {
  return request({
    url: `events/${postId}`,
    method: "get"
  });
}
