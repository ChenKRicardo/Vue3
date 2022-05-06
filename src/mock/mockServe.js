//引入mockjs模块
import Mock from 'mockjs'
//JSON格式引入()
//webpack默认对外暴露：图片、JSON数据格式
import banner from './banner.json'
import floor from './floor.json'
//mock数据,第一次参数：请求的地址  第二个参数：请求对象
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})