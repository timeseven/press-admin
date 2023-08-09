// config interceptors
import axios from "axios";
import { store } from "../redux/store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const instance = axios.create({
  // baseURL: "http://localhost:3001",
  baseURL: "https://alabaster-tarry-lavender.glitch.me/",
  timeout: 1000,
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    store.dispatch({
      type: "change_loading",
      payload: true,
    });
    NProgress.start();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    store.dispatch({
      type: "change_loading",
      payload: false,
    });
    NProgress.done();
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    store.dispatch({
      type: "change_loading",
      payload: false,
    });
    NProgress.done();
    return Promise.reject(error);
  }
);

const fetch = {
  axios: instance,
  get(url, params) {
    return instance.get(url, params);
  },
  post() {
    return instance.post.apply(instance, arguments);
  },
  delete() {
    return instance.delete.apply(instance, arguments);
  },
  patch() {
    return instance.patch.apply(instance, arguments);
  },
};

export default fetch;
