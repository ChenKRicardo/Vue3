import { reqGoodsList, reqAddOrUpdateShopCart } from "@/api";
//封装游客身份
import { getUUID } from "@/utils/uuid_token";
export default {
  actions: {
    //获取商品详情
    async getGoodsList({ commit }, skuId) {
      let result = await reqGoodsList(skuId);
      if (result.code === 200) {
        commit("GETGOODSLIST", result.data);
      }
    },
    //添加到购物车 服务器无需返回数据||修改购物车商品数量
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
      let result = await reqAddOrUpdateShopCart(skuId, skuNum);
      if (result.code === 200) {
        return "ok";
      } else {
        return Promise.reject(new Error("添加购物车失败"));
      }
    },
  },
  mutations: {
    GETGOODSLIST(state, goodsList) {
      state.goodsList = goodsList;
    },
  },
  state: {
    goodsList: {},
    //游客临时身份
    uuid_token:getUUID()
  },
  getters: {
    skuInfo(state) {
      return state.goodsList.skuInfo || {};
    },
    categoryView(state) {
      return state.goodsList.categoryView || {};
    },
    spuSaleAttrList(state) {
      return state.goodsList.spuSaleAttrList || {};
    },
  },
};
