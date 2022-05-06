# my-blog

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 静态路由组件

```
Footer && Header 
```

### 动态路由组件

```
Home && Search && Login && Register =>pages文件中
```

### 三级联动组件（全局组件）

Home、Search、Detail使用，因此注册全局组件，以此在项目任意地方使用

### POSTMAN测试接口

整个项目，接口前缀都有/api

### axios二次封装

请求拦截器、响应拦截器
请求拦截器:在发送请求之前可以处理一些业务
响应拦截器:数据返回之后，进行处理
API文件夹放置axios请求

### 接口统一管理

项目很小:可以在组件中用mounted()发请求

### 处理跨域

JSONP CROS 代理

### nprogress进度条的使用

### Vuex状态管理库(模块化开发)

### 完成ShopNav三级联动展示数据业务

### 完成一级分类动态添加背景颜色

1.hover
2.JS

### JS控制二三级商品分类的显示与隐藏

CSS:display:none|block
推荐JS

### 防抖与节流

### 三级联动组件的路由跳转与传递参数

方案:编程式导航+自定义属性

### Search页面中ShopNav中显示隐藏+过渡动画

### 三级联动商品数据的请求优化

APP根组件（mounted）发送数据请求

### 合并params和query参数

```
goSearch() {
            let location = {name:'search'}
            let params = {shop: this.shop || undefined}
            if(this.$route.query){
             location.query = this.$route.query
             location.params = params
             this.$router.push(location)
            }
        }
```

### 开发Home首页中的ListContainer与Floor组件

只有ShopNav的数据是服务器返回的
mock(生成随机数据，拦截Ajax请求):mock数据，需要插件mockjs
前端mock中的数据无法法和服务器进行通信，浏览器拦截AJAX请求使得不会发向服务器
使用步骤
1.src创建mock文件夹
2.准备JSON数据(mock文件家中创建相应的JSON文件)---必须格式化
3.mock数据需要的数据放置到publci文件中
4.开始虚拟数据,通过mockjs模块 创建mockServe.js文件
5.mockServe.js在入口文件引入

### ListContainer轮播（Swiper5）

npm i --save swiper@5
watch + $nextTick()

### 开发floor组件

v-for也可以在自定义标签使用
在Home中发请求,floor组件中直接mouted中使用
这次是在Home请求数据，父组件已得到数据并传给子组件，并且结构已生成

### 共用组件carouse轮播图组件

对页面中相同的功能拆分成全局组件

### 开发Search模块

1.静态页面 + 静态组件拆分
2、发请求（API）
3.vuex存储仓库
4、组件获取仓库数据,动态展示数据

### 根据params,query参数进行搜索

### 面包屑的处理

1.处理分类
2.处理关键字
3.处理品牌信息

### 商品属性的操作

### Important 排序

1：综合 2：价格 asc 升序，  desc:降序
order属性 asc  desc
1:asc
1:desc
2.asc
2.desc
四种排序情况
通过order值 1||2来判断综合与价格拥有类名 有类名就有箭头

### 分页器完善(原理)

ElementUI有相应组件，但前台暂不使用（掌握自定义分页功能）
分页器展示，需要哪些数据
1.当前页 pageNow
2.每页展示多少条数据 pageSize
3.一共有多少条数据 total
4.一共多少页 total/pageSize Math.ceil()
5.分页器连续页码个数 5|7【奇数】why奇数(对称性美观) continues 代表页数至少5页
自定义分页：项目开发，先进行调试，成功后在用服务器数据
Important 计算出连续页码的起始值和结束值
当前第8页
6，7，'8'，9 ,10
当前第15页
13，14，'15'，16，17

### 商品详情页完善
1.静态组件=>路由=>api请求=>数据存储仓库
排他：商品属性isChecked
放大镜

### 添加到购物车
商品数据使用会话存储

### 购物车
1发起请求，获取购物车数据,但无法得到数据（服务器无法识别用户ID得到指定用户的购物车）
2.Improtant uuId临时游客登录(将ID放入请求头中，config.headers)
3.动态展示购物车(数据格式)
4.修改产品个数  (节流)
5.删除购物车商品
6.切换商品选中状态
7.删除选中状态商品没有一次删除多个产品的接口
Promise.all([p1,p2,p3])
每个参数都是Promise对象，有一个失败则都失败

### 登录(处理共用图片资源问题)
```
管理员账号 13700000000
111111
```
1.静态资源=>动态展示
2.assets文件夹--放置所有组件共用的静态资源
3.token令牌【唯一标识符】(登录成功后，后台为了区分用户,服务器派发了token)
    1.一般登录成功，服务器下发token,前台需要持久化存储token,通过token找服务器要用户信息
    2.Vuex存储数据并不是持久化
4.用户登录携带token获取用户信息
问题:登录后获取到token存储仓库(非持久化)，刷新，token消失
5.持久化存储token localStorage
问题:{
    1.路由的跳转必须在登录情况下，有用户登录信息
    2.登录成功后，登录信息不应展示登录页
    }
### 注册

### 退出登录

### 路由守卫
全局守卫
1.登陆后，用户不能回到登录页
2.没有登陆，不能去购物车，交易页，支付，用户中心
3.有用户信息放行，无则请求在放行
4.token失效，清除原token再次请求
5.将未去成的页面地址存储地址栏中,登陆后直接跳转(next('/login?redirect='+topath))
路由独享守卫(已经登录)
1.只有购物车->交易
2.只有交易->支付页面
3.只有支付页面->支付成功页面

### 交易页面
1.提交订单需要向服务器发起请求，将交易信息传给服务器
2.不再在vuex进行请求

### 提交订单支付
1.微信支付使用ElementUI
2.二维码的生成 qrcode  npm install --save qrcode
3.不断向服务器发请求查询用户支付状态(长轮询)

### 个人中心
1.动态展示数据
2.复用分页组件

### 图片懒加载
npm i vue-lazyload
v-lazy

### 自定义插件

### 表单验证
npm i vee-validate@2

### 路由懒加载
只有路由被访问的时候才加载对应组件

### 打包上线
npm run  build
项目打包后，代码都是经过加密压缩的，如果运行时报错，输出的错误信息
无法准确得知哪里报错
有了map就可以向未加密的代码一样，准取的输出是哪一行那一列有错
所以该文件如果项目不需要可以删除
vue.config.js配置
productionSourceMap:false


### nginx
1.项目数据来自http://39.98.123.211
2.why访问服务器IP地址就可以访问到项目

nginx配置  xshell进入etc
sudo apt install nginx

# 进入nginx配置目录
1.cd /etc/nginx
2.vim nginx.conf
3.systemctl start nginx
location / {
        root /root/ck/www/shangpinhui/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
        }

        location /api {
                proxy_pass http://39.98.123.211;
        }
