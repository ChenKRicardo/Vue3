<template>
  <div class="child">
      <h1>子组件</h1>
      <Son/>
  </div>
</template>

<script>
import Son from './Son.vue'
export default {
    components:{Son},
  
}
</script>

<style>
  .child{
    background-color: rgb(187, 201, 126);
        padding: 10px;

  }
</style>