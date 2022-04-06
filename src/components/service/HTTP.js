import axios from "axios";
import env from "../../../env";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Promise } from "es6-promise";
NProgress.configure({
  easing: "ease",
  speed: 100,
  showSpinner: false
});
// create a new axios instance
const instance = axios.create();

// before a request is made start the nprogress
instance.interceptors.request.use(
  c => {
    NProgress.start();
    return c;
  },
  error => {
    NProgress.done();
    return Promise.reject(error);
  }
);

// before a response is returned stop nprogress
instance.interceptors.response.use(
  response => {
    NProgress.done();
    return response;
  },
  error => {
    NProgress.done();
    return Promise.reject(error);
  }
);

export default instance;
