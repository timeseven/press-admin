// config interceptors
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 1000,
});

instance.interceptors.request.use((config) => {
  // Do the judge
  console.log("axios interceptors>>>>>");
  return config;
});

const fetch = {
  axios: instance,
  get(url, params) {
    return instance.get(url, params);
  },
  post() {
    return instance.post.apply(instance, arguments);
  },
  delete() {
    console.log("delete:", instance, ...arguments);
    return instance.delete.apply(instance, arguments);
  },
};

export default fetch;
