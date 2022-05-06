<template>
  <div>
    <!-- 三级联动全局组件 -->
    <ShopNav />
    <ListContainer />
    <Tody />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :key="floor.id" :floors="floor" />
    <Brand />
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer/ListContainer.vue'
import Tody from '@/pages/Home/Tody/Tody.vue'
import Rank from '@/pages/Home/Rank/Rank.vue'
import Like from '@/pages/Home/LIke/Like.vue'
import Floor from '@/pages/Home/Floor/Floor.vue'
import Brand from '@/pages/Home/Brand/Brand.vue'
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    ListContainer,
    Tody,
    Rank,
    Like,
    Floor,
    Brand,
  },
  //这次是在Home请求数据，父组件已得到数据并传给子组件，并且结构已生成
  computed: {
    ...mapState({ floorList: state => state.home.floorList })
  },
  mounted() {
    //获得首页Floor模块数据信息
    this.$store.dispatch('getFloorList')
   
  },
}
</script>
