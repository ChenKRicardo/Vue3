<template>
  <div class="app">
    <Child/>
  </div>
</template>

<script>
import Child from "./components/Child.vue";
import { reactive, toRefs } from "vue";
export default {
  components: { Child },
  setup() {},
};
</script>

<style>
.app {
  background-color: skyblue;
  padding: 10px;
}
</style>
