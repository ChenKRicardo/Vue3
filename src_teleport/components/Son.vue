<template>
  <div class="son">
    <h1>孙组件</h1>
    <Dialog />
  </div>
</template>

<script>
import Dialog from "./Dialog.vue";
export default {
  components: { Dialog },
};
</script>

<style>
.son {
  background-color: rgb(224, 144, 198);
  padding: 10px;
}
</style>
