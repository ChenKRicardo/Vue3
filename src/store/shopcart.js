import { reqGetCartList, delCart, reqchangeChecked } from "@/api";
export default {
  actions: {
    async getCartList({ commit }) {
      let result = await reqGetCartList();
      if (result.code === 200) {
        commit("GETCARLIST", result.data);
      }
    },
    async delCarts({ commit }, skuId) {
      let result = await delCart(skuId);
      if (result.code === 200) {
        return "ok";
      } else {
        return Promise.reject(new Error("删除失败"));
      }
    },
    async changeChecked({ commit }, { skuId, isChecked }) {
      let result = await reqchangeChecked(skuId, isChecked);
      if (result.code == 200) {
        return "ok";
      } else {
        return Promise.reject(new Error("切换失败"));
      }
    },
    //删除全部勾选产品
    delAllCheckedCart({ dispatch, getters }) {
      //context(小仓库)有state，dispacth,getters，commit
      //获取购物车中全部商品循环遍历删除
      let promises = [];
      let cartInfoList =  getters.cartList.cartInfoList||[]
      // console.log(cartInfoList);
     cartInfoList.forEach((item) => {
      let promise =  item.isChecked === 1 ? dispatch("delCarts", item.skuId) : "";
        promises.push(promise);
        // console.log(promises);
      });
      // console.log(promises);
      return Promise.all(promises);
    },
    //勾选全部商品
    checkAllCart({dispatch,state},isChecked){
      console.log(state.cartList[0].cartInfoList);
      let promises = []
      state.cartList[0].cartInfoList.forEach(item=>{
        let promise = dispatch('changeChecked',{skuId:item.skuId,isChecked})
        promises.push(promise)
        console.log(item);
      })
      return Promise.all(promises)
    }
  },
  mutations: {
    GETCARLIST(state, cartList) {
      state.cartList = cartList;
    },
  },
  state: {
    cartList: [],
  },
  getters: {
    cartList(state) {
      return state.cartList[0] || [];
    },
  },
};
