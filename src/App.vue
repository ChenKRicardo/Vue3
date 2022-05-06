<template>
  <div>
    <Header />
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- 在Home、search显示，登录注册隐藏 -->
    <Footer v-show="$route.meta.FooterIsShow" />
  </div>
</template>

<script>
import Header from './components/Header/Header.vue'
import Footer from './components/Footer/Footer.vue'
export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  mounted() {
    //放在跟组件中只执行一次提高运行效率，以免Home,Search组件的切换来回请求
    //通过Vuex发请求，获取三级联动商品数据，存储仓库中
    this.$store.dispatch('getCategoryList');
  },
 
}
</script>

<style>
</style>