import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store";
Vue.use(VueRouter);
//先将VueRouter原型对象的push,replace,保存一份
let originPush = VueRouter.prototype.push;
let originRelpace = VueRouter.prototype.replace;
//重写push|replace
//第一个参数，告诉push往哪里跳转
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, reject, resolve);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originRelpace.call(this, location, reject, resolve);
  } else {
    originRelpace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
//配置路由
let router = new VueRouter({
  routes,
  scrollBehavior() {
    // return 期望滚动到哪个的位置
    return { y: 0 };
  },
});
//全局前置守卫(路由跳转之前进行判断)
router.beforeEach(async (to, from, next) => {
  //next放行函数，next()
  //next('/login) 方行到login页 next('path)
  //用户登录禁止回到login
  let name = store.state.login.userInfo.name;
  if (localStorage.getItem("TOKEN")) {
    //拦截登录后去login
    if (to.path == "/login") {
      next("/home");
    } else {
      //去了其他页面，且有用户信息
      if (name) {
        next();
      } else {
        //没有用户信息，则派发actions让仓库存储用户信息在跳转
        try {
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          //token失效获取不到用户信息，重新派发
          //清除token
          await store.dispatch("logOut");
          next('/login')
        }
      }
    }
    //没登陆支付【pay/paySuccess】，交易，个人中心禁止访问
  } else {
    let topath = to.path
    if(topath.indexOf('/trade')!=-1||topath.indexOf('/pay')!=-1||topath.indexOf('/center')!=-1){
      //将未去成的页面地址存储地址栏中,登陆后直接跳转
      next('/login?redirect='+topath)
    }else{//首页，search,shopCart放行
      next()
    }
  }
});
export default router;
