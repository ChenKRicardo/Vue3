### 路由跳转的实现
1.编程式路由导航(push|replace)
2.声明式导航
```
<route-link></route-link>
```

### Footer组件的显示与隐藏
Home、Search显示,Login、Register隐藏
路由配置:meta:{FooterIsShow:true}
```
 <Footer v-show="$route.meta.FooterIsShow"/>
```
### 路由传参
Search接受query参数
