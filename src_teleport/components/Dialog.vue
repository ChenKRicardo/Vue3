<template>
  <button @click="isShow = true">点击弹窗</button>
  <teleport to="body">
    <div class="mask" v-if="isShow">
      <div class="dialog" v-if="isShow">
        <h3>弹窗区</h3>
        <button @click="isShow = false">关闭弹窗</button>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    let isShow = ref(false);
    return {
      isShow,
    };
  },
};
</script>

<style>
.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(0, 0, 0, 0.5);
}
.dialog {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
  width: 300px;
  height: 300px;
  background-color: pink;
}
</style>
