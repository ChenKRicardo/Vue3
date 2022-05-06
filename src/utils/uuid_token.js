import { v4 as uuidv4 } from "uuid";
//生成随机字符串，且每次执行都不能发生改变，游客身份持久存储
export const getUUID = () => {
  let uuid_token = localStorage.getItem("UUIDTOKEN");
  if (!uuid_token) {
    uuid_token =  uuidv4()
    localStorage.setItem("UUIDTOKEN",uuid_token);
  }
  //必须有返回值
  return uuid_token
};
