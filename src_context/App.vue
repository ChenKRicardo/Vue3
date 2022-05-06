<template>
  <Demo msg="传递" @hello="showMsg">
   <template v-slot:msg>
      <span>slot</span>
   </template>
  </Demo>
</template>
<script>
import Demo from './components/Demo.vue'
export default {
  name: "App",
  components:{Demo},
  setup() {
    function showMsg(value) {
      alert("接收参数", value);
    }
    return {
      showMsg,
    };
  },
};
</script>
<style></style>
