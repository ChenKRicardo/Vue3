<template>
  <div>
    <ShopNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">×</i>
            </li>
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="delKeyWord">×</i>
            </li>
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="delTrademark">×</i>
            </li>
            <li
              class="with-x"
              v-for="(attr, index) in searchParams.props"
              :key="index"
            >
              {{ attr.split(":")[1] }}
              <i @click="delProps(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          :trademarkList="trademarkList"
          :attrsList="attrsList"
          @receiveTradeMark="receiveTradeMark"
          @receiveAttrs="receiveAttrs"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a
                    >综合<span
                      v-show="isOne"
                      class="iconfont"
                      :class="{ 'icon-down': down, 'icon-up': up }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a
                    >价格<span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{ 'icon-down': down, 'icon-up': up }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`">
                        <img v-lazy="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <em>&nbsp;</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="goods.title">{{
                      goods.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">
                      已有
                      <span>2000</span>人评价
                    </i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 分页器 -->
        <Pagination 
        :pageNo="searchParams.pageNo" 
        :pageSize="searchParams.pageSize" 
        :total="total" 
        :continues="5"
        @getPage="getPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector.vue";
import { mapGetters,mapState } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        //服务器请求所需参数
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        //排序初始状态：综合 desc
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
  },
  beforeMount() {
    //在给服务器发请求之前，把接口所需参数进行整理，服务器根据参数进行查询
    //Object.assign 合并对象
    // this.searchPrams.category1Id = this.$route.query.category1id
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getDate();
  },
  watch: {
    //监听路由变化，变化则再次发请求
    $route() {
      Object.assign(this.searchParams, this.$route.params, this.$route.query);
      this.getDate();
    },
  },
  computed: {
    ...mapGetters(["goodsList", "trademarkList", "attrsList", "pageSize"]),
    ...mapState({total:state=> state.search.searchInfo.total}),
    isOne() {
      return this.searchParams.order.indexOf(1) != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf(2) != -1;
    },
    up() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    down() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
  },
  methods: {
    //methods每次搜索都会发请求调用函数，而mounted只会发起一次
    getDate() {
      this.$store.dispatch("getSearchInfo", this.searchParams);
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
    //删除三级路径三级列表信息
    removeCategoryName() {
      this.searchParams.category1Id = undefined; //值设为undefined，使数据不会传递给服务器，提高效率
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.searchParams.categoryName = undefined;
      this.getDate();
      //地址栏也需修改只删query参数,若有params则保留不删
      if (this.$route.params) {
        this.$router.push({
          name: "search",
          params: this.$route.params,
        });
      }
    },
    //删除搜索关键字
    delKeyWord() {
      this.$route.params.keyword = undefined;
      this.getDate();
      if (this.$route.query) {
        this.$router.push({
          name: "search",
          query: this.$route.query,
        });
      }
      //通知兄弟组件Header组件清除keyword
      this.$bus.$emit("clearKeyWord");
    },
    //接受品牌信息
    receiveTradeMark(tradeMark) {
      this.searchParams.trademark = `${tradeMark.tmId}:${tradeMark.tmName}`;
      this.getDate();
    },
    //删除品牌信息
    delTrademark() {
      this.searchParams.trademark = undefined;
      this.getDate();
      if (this.$route.query) {
        this.$router.push({
          name: "search",
          query: this.$route.query,
        });
      }
    },
    //接受商品属性，并传递服务器
    receiveAttrs(attrs, attrValue) {
      let props = `${attrs.attrId}:${attrValue}:${attrs.attrName}`;
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props);
      }
      this.getDate();
    },
    //删除商品属性
    delProps(index) {
      this.searchParams.props.splice(index, 1);
      this.getDate();
    },
    //排序
    changeOrder(flag) {
      let originOrder = this.searchParams.order.split(":")[1];
      let newOrder = "";
      if (flag == "1") {
        newOrder = `1:${originOrder == "desc" ? "asc" : "desc"}`;
      } else {
        newOrder = `2:${originOrder == "desc" ? "asc" : "desc"}`;
      }
      this.searchParams.order = newOrder;
      this.getDate();
    },
    //获取当前页数
    getPage(pageNow){
      // console.log(pageNow);
      this.searchParams.pageNo = pageNow
      this.getDate()
    }
    
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

     
    }
  }
}
</style>
