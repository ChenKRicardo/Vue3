export default [
  {
    path: "/home",
    //路由懒加载只有路由被访问的时候才加载对应组件
    component: () => import("@/pages/Home/Home.vue"),
    meta: {
      FooterIsShow: true,
    },
  },
  {
    name: "search",
    path: "/search/:keyword?",
    component: () => import(`@/pages/Search/Search.vue`),
    meta: {
      FooterIsShow: true,
    },
    props({ params }) {
      return {
        keyword: params.keyword,
      };
    },
  },
  {
    name: "login",
    path: "/login",
    component: () => import(`@/pages/Login/Login.vue`),
    meta: {
      FooterIsShow: false,
    },
  },
  {
    path: "/register",
    component: () => import(`@/pages/Register/Register.vue`),
    meta: {
      FooterIsShow: false,
    },
  },
  {
    name: "detail",
    path: "/detail/:skuId",
    component: () => import(`@/pages/Detail`),
    meta: {
      FooterIsShow: true,
    },
  },
  {
    name: "addcart",
    path: "/addcart/",
    component: () => import(`@/pages/AddCart`),
    meta: {
      FooterIsShow: true,
    },
  },
  {
    name: "shopcart",
    path: "/shopcart",
    component: () => import(`@/pages/ShopCart`),
    meta: {
      FooterIsShow: true,
    },
  },
  {
    name: "trade",
    path: "/trade",
    component: () => import(`@/pages/Trade`),
    meta: {
      FooterIsShow: true,
    },
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == "/shopcart") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    name: "pay",
    path: "/pay",
    component: () => import(`@/pages/Pay`),
    meta: {
      FooterIsShow: true,
    },
    beforeEnter: (to, from, next) => {
      if (from.path === "/trade") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    name: "paySuccess",
    path: "/paySuccess",
    component: () => import(`@/pages/PaySuccess`),
    meta: {
      FooterIsShow: true,
    },
    //这里采用组件内守卫
  },
  {
    name: "center",
    path: "/center",
    component: () => import(`@/pages/Center`),
    meta: {
      FooterIsShow: true,
    },
    //二级路由
    children: [
      {
        name: "myOrder",
        path: "myOrder",
        component: () => import(`@/pages/Center/myOrder`),
      },
      {
        name: "groupOrder",
        path: "groupOrder",
        component: () => import(`@/pages/Center/groupOrder`),
      },
      {
        path: "/center",
        redirect: "/center/myOrder",
      },
    ],
  },
  //重定向，项目运行，访问/,会定向到首页
  {
    path: "*",
    redirect: "/home",
  },
];
