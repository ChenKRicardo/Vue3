import { reqCategoryList ,reqGetBannerList,reqGetFloorList} from "@/api"
export default  {
    actions:{
        //通过API里面的接口函数调用，向服务器发请求，获取服务器数据
       async getCategoryList({commit}){
           let result =await reqCategoryList()
           if(result.code ==200){
               commit("GETCATEGORYLIST",result.data)
           }
        },
        async getBannerList({commit}){
            let result = await reqGetBannerList();
            if(result.code === 200){ 
                commit('GETBANNERLIST',result.data)
            }
        },
        async getFloorList({commit}){
            let result = await reqGetFloorList();
            if(result.code === 200){ 
                commit('GETFLOORLIST',result.data)
            }
        }
    },
    mutations:{
        GETCATEGORYLIST(state,categoryList){
            categoryList.splice(categoryList.length-4,4)
            state.categoryList = categoryList
        },
        GETBANNERLIST(state,bannerList){
            state.bannerList = bannerList
        },
        GETFLOORLIST(state,floorList){
            state.floorList = floorList
        }
    },
    state:{
        categoryList:[],
        bannerList:[],
        floorList:[]
    },
    getters:{}
}
