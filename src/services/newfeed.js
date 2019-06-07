import request from './request'

export function getNewfeed(type) {
    if (type === 0) {
        return request({
            url:`/newsfeed`,
            method: 'get'
        })
        //return Axios.get('/posts', { headers: { "x-access-token": localStorage.getItem("token") } });
    } else {
        return request({
            url:`/newsfeed?type=${type}`,
            method: 'get'
        })
        //return Axios.get(`/posts?type=${type}`, { headers: { "x-access-token": localStorage.getItem("token") } });
    }
}