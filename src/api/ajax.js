//对于axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
//引入进度条样式
import "nprogress/nprogress.css";
//start:进度条开始，done:进度条结束
//引入store模块
import store from "@/store";
//创建axios实例,名为requests
const requests = axios.create({
  //配置对象
  //基础路径
  baseURL: "/api",
  //请求超时时间
  timeout: 5000,
});
//请求拦截器:在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
  //config:配置对象，有个headers属性
  //将游客身份通过请求头携带至服务器
  if(store.state.detail.uuid_token){
    config.headers.userTempId = store.state.detail.uuid_token
  }
  //需要携带token给服务器
  if(store.state.login.token){
    config.headers.token = store.state.login.token
  }
  //进度条开始
  nprogress.start();
  return config;
});
//响应拦截器
requests.interceptors.response.use(
  //进度条结束
  (res) => {
    nprogress.done();
    return res.data;
  },
  (error) => {
    return Promise.reject(new Error("false"));
  }
);
export default requests;
