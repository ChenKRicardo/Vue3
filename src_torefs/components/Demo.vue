<template>
  <h1>姓名:{{ name }}</h1>
  <h1>年龄:{{ age }}</h1>
  <h1>薪水:{{ job.web.salary }}K</h1>
  <button @click="name += 'CK'">修改姓名</button>
  <button @click="age++">点击年龄加1</button>
  <button @click="job.web.salary++">点击薪水加1</button>
</template>
<script>
import {reactive,toRefs} from 'vue'
export default {
  name: "Demo",
  setup() {
     const person = reactive({
      name: "Ricardo",
      age: 21,
      job: {
        web: {
          salary: 20,
        },
      },
    });
    const x = toRefs(person)
    console.log(x);
    return {
      ...toRefs(person)
    };
  },
};
</script>
