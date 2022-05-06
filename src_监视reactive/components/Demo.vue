<template>
  <h1>当前求和为:{{ sum }}</h1>
  <button @click="sum++">点击加1</button>
  <hr />
  <h1>当前信息为:{{ msg }}</h1>
  <button @click="msg += 'CK'">修改信息</button>
  <hr />
  <h1>姓名:{{ person.name }}</h1>
  <h1>年龄:{{ person.age }}</h1>
  <h1>薪水:{{ person.job.web.salary }}K</h1>
  <button @click="person.name += 'CK'">修改姓名</button>
  <button @click="person.age++">点击年龄加1</button>
  <button @click="person.job.web.salary++">点击薪水加1</button>
</template>
<script>
import { ref, watch, reactive } from "vue";
export default {
  name: "Demo",
  setup() {
    const sum = ref(0);
    const msg = ref("hello");
    const person = reactive({
      name: "Ricardo",
      age: 21,
      job: {
        web: {
          salary: 20,
        },
      },
    });
    //watch 情况一：监视ref所定义一个的响应式数据
    // watch(sum, (newValue, oldValue) => {
    //   console.log(newValue, oldValue);
    // },{immediate:true});

    //watch 情况二：监视ref所定义多个的响应式数据
    // watch([sum,msg],(newValue, oldValue)=>{
    //   console.log(newValue, oldValue);
    //   //(1) [1, 'helloCKCK'] (2) [1, 'helloCK']
    // })

    //watch 情况三：监视reactive所定义一个的响应式数据,
    /*
        1.无法正确获取oldValue
        2.强制开启深度监视
      */
    // watch(
    //   person,
    //   (newValue, oldValue) => {
    //     console.log("new", newValue);
    //     console.log("old", newValue);
    //   },
    //   { deep: false }
    // );

    //watch 情况四：监视reactive所定义一个的响应式数据的某个属性,
    // watch(()=>person.age, (newValue, oldValue) => {
    //   console.log("person的age",newValue,oldValue);
    // });

    //watch 情况五：监视reactive所定义一个的响应式数据的某些属性,
    // watch([()=>person.age,()=>person.name], (newValue, oldValue) => {
    //   console.log("person的age和name",newValue,oldValue);
    // });

    // 特殊情况
    watch(()=>person.job, (newValue, oldValue) => {
      console.log("person的job",newValue,oldValue);
    },{deep:true});
    return {
      sum,
      msg,
      person,
    };
  },
};
</script>
<style></style>
