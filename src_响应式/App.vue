<template>
  <h1>APP组件</h1>
  <h2>{{ p.name }}</h2>
  <h2>{{ p.job.type }}</h2>
  <button @click="sayName">触发函数</button>
  <button @click="changeInfo">修改姓名</button>
</template>
<script>
// import {h} from 'vue'
import { ref, reactive } from "vue";
export default {
  setup() {
    //data
    // let name = ref("ck");
    // let job = reactive({
    //   type:'前端工程师'
    // })
    const person = {
      name: "ck",
      job: {
        type: "前端工程师",
      },
    };
    const p = reactive(person);
    //方法
    function sayName() {
      console.log(p.name);
    }
    function changeInfo() {
      // name.value = "陈康";
      // job.type = '高级前端工程师'
      p.name = "陈康";
      p.job.type = "高级前端工程师";
    }
    //返回一个对象
    return {
      p,
      sayName,
      changeInfo,
    };
    //返回一个渲染函数
    // return ()=>{ return h('h1','陈康')}
  },
};
</script>
<style></style>
