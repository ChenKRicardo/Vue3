<template>
  <h1>鼠标坐标为:X({{ point.x }})---Y({{ point.y }})</h1>
</template>
<script>
import usePoint from "../hooks/usePoint";
export default {
  name: "Demo",
  setup() {
    let point = usePoint();
    return {
      point,
    };
  },
};
</script>
