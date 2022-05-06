import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
//图片懒加载
import VueLazyload from 'vue-lazyload'
//引入mock模块
import "@/mock/mockServe";
//引入Swiper
import "swiper/css/swiper.css";
//统一接口api
import * as API from "@/api";
//引入elementUI button按钮
import { Button, MessageBox } from "element-ui";
//引入表单验证
import  '@/plugins/validate'
//注册全局组件
import ShopNav from "@/components/ShopNav/ShopNav.vue";
import Carouse from "@/components/Carouse/Carouse.vue";
import Pagination from "@/components/Pagination/Pagination.vue";
import Foot from "@/components/Foot/Foot.vue";
//引入动态图
import hutao from '@/assets/hutao.gif'
Vue.component(ShopNav.name, ShopNav);
Vue.component(Carouse.name, Carouse);
Vue.component(Pagination.name, Pagination);
Vue.component(Foot.name, Foot);
Vue.component(Button.name, Button);
Vue.component(MessageBox.name, MessageBox);
//element组件还可以挂载在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.config.productionTip = false;
Vue.use(VueLazyload,{
  preLoad: 1.3,
  loading: hutao,//懒加载默认图片
  attempt: 1
})
new Vue({
  render: (h) => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
}).$mount("#app");
