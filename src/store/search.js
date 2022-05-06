import {
    regGetSearchInfo
} from '@/api'
export default {
    namespace: true,
    actions: {
        async getSearchInfo({
            commit
        }, params = {}) {
            let result = await regGetSearchInfo(params)
            if (result.code === 200) {
                commit('SEARCHINFO', result.data)
            }
        }
    },
    mutations: {
        SEARCHINFO(state, searchInfo) {
            state.searchInfo = searchInfo
        }
    },
    state: {
        searchInfo: {}
    },
    //计算属性，在项目中，为了简化数据
    getters: {
        //空数组：防止网络异常，所以让其返回undefined
        goodsList(state) {
            return state.searchInfo.goodsList || []
        },
        trademarkList(state) {
            return state.searchInfo.trademarkList || []
        },
        attrsList(state) {
            return state.searchInfo.attrsList || []
        },
        pageSize(state) {
            return state.searchInfo.pageSize || []

        }
    }
}