import { reqLogin, reqGetUserInfo, reqLogOut } from "@/api";
import { setToken, getToken,removeToken } from "@/utils/token";
export default {
  actions: {
    //登录
    async login({ commit }, userInfo) {
      let result = await reqLogin(userInfo);
      //通常需要带token找服务器要用户信息进行展示
      if (result.code === 200) {
        commit("LOGIN", result.data.token);
        setToken(result.data.token);
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    //获取用户信息展示在头部组件
    async getUserInfo({ commit }) {
      let result = await reqGetUserInfo();
      if (result.code === 200) {
        commit("GETUSERINFO", result.data);
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    //退出登录
    async logOut({ commit }) {
      //actions无法操作state
      let result = await reqLogOut();
      if (result.code === 200) {
        commit("CLEAR");
        return 'ok'
      }else{
        return Promise.reject(new Error(result.message))
      }
    },
  },
  mutations: {
    LOGIN(state, token) {
      state.token = token;
    },
    GETUSERINFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    CLEAR(state) {
      //清空仓库用户信息
      state.userInfo = {};
      state.token = "";
      //移除本地存储
      removeToken()
    },
  },
  state: {
    token: getToken(),
    userInfo: {},
  },
  getters: {},
};
