<template>
  <div class="app">
    <h1>祖组件{{userName}}</h1>
    <Child userName="userName"/>
  </div>
</template>

<script>
import Child from "./components/Child.vue";
import { reactive,toRefs,provide} from "vue";
export default {
  components: { Child },
  setup() {
    let person = reactive({
      userName: "Ricardo",
    });
    provide('person',person.userName)//给自己的后代组件传递数据
    return {
      ...toRefs(person)
    };
  },
};
</script>

<style>
.app {
  background-color: skyblue;
  padding: 10px;
}
</style>
