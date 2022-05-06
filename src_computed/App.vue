<template>
  <Demo/>
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
