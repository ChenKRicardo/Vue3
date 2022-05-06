//对所有的API进行统一管理
import requests from './ajax'
import mockRequests from './mockAjax'
//三级联动接口
///api/product/getBaseCategoryList  Get 无参数
export const reqCategoryList = () => requests.get(`/product/getBaseCategoryList`)


//获取首页轮播图接口
export const reqGetBannerList = () => mockRequests.get('/banner')

//获取floor轮播接口
export const reqGetFloorList = () => mockRequests.get('/floor')

//获取Search页面数据接口  post 给服务器传递的默认参数至少是一个空对象
export const regGetSearchInfo = (params) => requests({
    url: `/list`,
    method: 'POST',
    data: params
})

//获取商品详情
export const reqGoodsList = (skuId) => requests({
    method: 'GET',
    url: `/item/${skuId}`
})

//添加到购物车(获取或更新某一个产品的个数)
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
    method: "POST",
    url: `/cart/addToCart/${skuId}/${skuNum}`,
})

//获取购物车列表
export const reqGetCartList = () => requests.get('/cart/cartList')

//删除购物车商品
export const delCart =(skuId)=>requests.delete(`/cart/deleteCart/${skuId}`)

//切换商品选中状态
export const reqchangeChecked =(skuId,isChecked)=>requests.get(`/cart/checkCart/${skuId}/${isChecked}`)

//获取验证码
export const reqGetCode = (phone)=>requests.get(`/user/passport/sendCode/${phone}`) 

//注册
export const reqRegister = (data)=>requests({
    url:`/user/passport/register`,
    method:"POST",
    data
})

//登录
export const reqLogin = (data)=>requests({
    url:`/user/passport/login`,
    method:'POST',
    data,
})

//token校验获取用户登录信息，用户登录只保存用户的token
export const reqGetUserInfo =()=>requests.get('/user/passport/auth/getUserInfo')

//退出登录
export const reqLogOut = ()=>requests.get(`user/passport/logout`)

//获取用户地址信息
export const reqGetUserAdress = ()=>requests.get(`user/userAddress/auth/findUserAddressList`)

//获取订单交易页信息
export const reqGetTrade = ()=>requests.get(`order/auth/trade`)

//提交订单交易信息
export const reqPostTradeInfo =(tradeNo,data)=>requests({
    method:'POST',
    url:`order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
})

//获取订单支付信息
export const reqGetPayInfo = (orderId)=>requests.get(`payment/weixin/createNative/${orderId}`)

//查询订单支付状态
export const reqGetPayStatus = (orderId)=>requests.get(`payment/weixin/queryPayStatus/${orderId}`)

//获取我的订单列表
export const reqGetMyCart = (page,limit)=>requests.get(`order/auth/${page}/${limit}`)