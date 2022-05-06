import { reqGetUserAdress,reqGetTrade,reqPostTradeInfo} from '@/api'
export default{
    actions:{
        async getAddress({commit}){
            let result = await reqGetUserAdress()
            if(result.code===200){
                commit('GETADDRESS',result.data)
                return 'ok'
            }else{
                return Promise.reject(new Error(result.mesage))
            }
        },
        async getTrade({commit}){
            let result = await reqGetTrade()
            if(result.code===200){
                commit('GETTRADE',result.data)
                return 'ok'
            }else{
                return Promise.reject(new Error(result.mesage))
            }
        },
    },
    mutations:{
        GETADDRESS(state,userAddress){
            state.userAddressList = userAddress
        },
        GETTRADE(state,trade){
            state.tradeList = trade
        }
    },
    state:{
        userAddressList:[],
        tradeList:{}
    },
    getters:{}
}