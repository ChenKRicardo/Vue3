//存储TOKEN
export const setToken = (token) => {
  localStorage.setItem("TOKEN", token);
};
//获取TOKEN
export const getToken = ()=>{
   return localStorage.getItem('TOKEN')
}
//移除TOKEN
export const removeToken = ()=>{
  return localStorage.removeItem('TOKEN')
}
