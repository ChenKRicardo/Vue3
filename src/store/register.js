import {reqGetCode,reqRegister} from '@/api'
export default {
    actions:{
        async getCode({commit},phone){
            let result = await reqGetCode(phone)
            if(result.code===200){
                commit('GETCODE',result.data)
            }
        },
        async register({commit},user){
            let result = await reqRegister(user)
            console.log(result);
            if(result.code ===200){
                return 'ok'
            }else{
                return Promise.reject(new Error(result.message))
            }
        }
    },
    mutations:{
        GETCODE(state,code){
            state.code = code
        }
    },
    state:{
        code:''
    },
    getters:{}
}