<template>
  <div class="child">
    <h1>子组件</h1>
    {{sum}}
  </div>
</template>

<script>
import {ref} from 'vue'
export default {
  async setup(){
    let sum = ref(0)
    let p = new Promise((reslove,reject)=>{
      setTimeout(()=>{
        reslove({sum})
      },3000)
    })
    return p
  }
};
</script>

<style>
.child {
  background-color: rgb(187, 201, 126);
  padding: 10px;
}
</style>
