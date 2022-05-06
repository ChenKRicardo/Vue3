//Vue插件一定暴露一个对象
let myPlugins = {}
myPlugins.install = function(Vue,options){
    //Vue.prototype.$bus
    //Vue.directive，自定义指令
    //Vue.component
    //console.log(options);//{name: 'super'}
    Vue.directive(options.name,(element,params)=>{
        //element绑定在当前元素
        //params绑定的值
        console.log(params);
        element.innerHTML = params.value
    })
}
export default myPlugins