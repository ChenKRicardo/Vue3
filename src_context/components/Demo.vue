<template>
  <h1>APP组件</h1>
  <h2>{{ person.name }}</h2>
  <h2>{{ person.job.type }}</h2>
  <button @click="sayHelo">触发自定义事件</button>
   <!--<button @click="changeInfo">修改姓名</button> -->
   <slot name="msg"></slot>
</template>
<script>
import { reactive } from "vue";
export default {
  name: "Demo",
  props: ["msg"],
  emits:['hello'],
  setup(props, context) {
    console.log(props,props.msg);
    console.log(props, context);
    console.log(context.emit);
    console.log(context.slots);
    const person = reactive({
      name: "ck",
      job: {
        type: "前端工程师",
      },
    });
    function sayHelo(){
        context.emit('hello','Demo')
    }
    return {
      person,
      sayHelo,
    };
  },
};
</script>
<style></style>
