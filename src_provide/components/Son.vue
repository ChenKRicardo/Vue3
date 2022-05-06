<template>
  <div class="son">
    <h1>孙组件</h1>
  </div>
</template>

<script>
import {inject} from 'vue'
export default {
    setup(props,context){
       let name =  inject('person')
       console.log('接收祖组件传递的数据',name);
       console.log(context.attrs);
    }
};
</script>

<style>
.son {
  background-color: rgb(224, 144, 198);
  padding: 10px;
}
</style>
