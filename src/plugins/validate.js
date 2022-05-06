import Vue from 'vue'
//引入表单验证插件
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)

//表单验证,默认是英文提示
VeeValidate.Validator.localize('zh_CN',{
    messages:{
        ...zh_CN.messages,//提示信息改为中文
        is:(field)=>`${field}必须与密码相同`,//修改内置规则的message，让确认密码和密码相同
    },
    attributes:{//给校验的filed属性名称映射中文名称
        phone:'手机号',
        code:'验证码',
        password:'密码',
        confirmPassword:'确认密码',
        agree:'同一协议'
    }
})
//自定义校验规则
VeeValidate.Validator.extend('agree',{
    validate:value=>{
        return value
    },
    getMessage:field=>field+'必须同意'
})

