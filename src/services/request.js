import axios from "axios";
import { Message } from "element-react";
import { getToken } from "../utils/localStorage";
import "element-theme-default";

const service = axios.create({
  baseURL: "http://172.105.113.23:3000/",
  timeout: 5000
});

service.interceptors.request.use(
  config => {
    config.headers["x-access-token"] = getToken();
    return config;
  },
  error => {
    console.log(error); // for debug
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // let message = error.response.data[Object.keys(error.response.data)[0]]
    // if (typeof (message) === 'object') {
    //   message = message[0]
    // }
    console.log(error.response)
    if (error && error.reponse && error.response.request && error.response.request.responseURL != "http://172.105.113.23:3000/me") {
      Message({
        message: JSON.stringify(error.response),
        type: "error",
        duration: 5 * 1000
      });
    }

    return Promise.reject(error);
  }
);

export default service;
