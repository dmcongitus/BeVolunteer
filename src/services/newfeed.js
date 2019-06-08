import request from './request'

export function getNewfeed(page) {
  
        return request({
            url:`/newsfeed?page=`+ page,
            method: 'get'
        })
       
}