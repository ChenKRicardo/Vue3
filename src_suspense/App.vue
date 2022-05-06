<template>
  <div class="app">
    <h1>App</h1>
    <Suspense>
      <template v-slot:default>
        <Child />
      </template>
      <template v-slot:fallback>
        <h3>Loading....</h3>
      </template>
    </Suspense>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
// import Child from "./components/Child.vue";//静态引入
//动态引入
const Child = defineAsyncComponent(() => import("./components/Child.vue"));
export default {
  setup() {},
  components: { Child },
};
</script>

<style>
.app {
  background-color: skyblue;
  padding: 10px;
}
</style>
