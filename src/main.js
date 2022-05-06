//引入createApp工厂函数
import { createApp } from "vue";
import App from "./App.vue";
import * as API from './api'
// createApp(App).mount('#app')
const app = createApp(App);
app.mount("#app");

app.config.globalProperties.$API = API;
console.log(app);