<template>
  <input type="text" v-model="keyWord" />
  <h3>{{ keyWord }}</h3>
</template>
<script>
import { ref, customRef } from "vue";
export default {
  name: "App",
  setup() {
    // let keyWord = ref('hello'),vue提供的ref
    function myRef(value, delay) {
      let timer = null;
      return customRef((track, trigger) => {
        return {
          get() {
            track(); //通知Vue追踪数据的变化
            return value;
          },
          set(newValue) {
            clearTimeout(timer);
            timer = setTimeout(() => {
              value = newValue;
              trigger(); //通知Vue重新解析模板
            }, delay);
          },
        };
      });
    }
    let keyWord = myRef("hello", 500); //自定义的ref
    return {
      keyWord,
    };
  },
};
</script>
<style></style>
