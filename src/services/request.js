import axios from 'axios'
import { Message } from 'element-react'
import { getToken, loadUserData } from '../utils/localStorage'
import 'element-theme-default';

const service = axios.create({
  baseURL: 'http://172.104.39.161:3000/',
  timeout: 5000 
})

service.interceptors.request.use(
  config => {
    if (Boolean(loadUserData())) {
      config.headers['x-access-token'] =  getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const status = response.status
    if (status === 400) {
      Message({
        message: response.message || 'error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(response.message || 'error')
    } else {
      return response
    }
  },
  error => {
    // let message = error.response.data[Object.keys(error.response.data)[0]]
    // if (typeof (message) === 'object') {
    //   message = message[0]
    // }
    Message({
      message: error.response.data,
      type: 'error',
      duration: 5 * 1000  
    })
    return Promise.reject(error)
  }
)

export default service