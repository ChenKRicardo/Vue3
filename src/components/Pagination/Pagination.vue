<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPage',pageNo-1)">上一页</button>
    <template v-if="continuesStartAndEnd.start > 1">
      <button @click="$emit('getPage',1)" :class="{active:pageNo==1}">1</button>
      <button>···</button>
    </template>

    <button
      v-for="(continuePage, index) in continuesStartAndEnd.end"
      :key="index"
      v-show="continuePage >= continuesStartAndEnd.start"
      @click="$emit('getPage',continuePage)"
      :class="{active:pageNo==continuePage}"
    >
      {{ continuePage }}
    </button>
    <template v-if="continuesStartAndEnd.end < totalPages">
      <button>···</button>
      <button  @click="$emit('getPage',totalPages)" :class="{active:pageNo==totalPages}">{{ totalPages }}</button>
    </template>
    <button :disabled="pageNo == totalPages" @click="$emit('getPage',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  props: ["pageNo", "pageSize", "total", "continues"],
  name: "Pagination",
  computed: {
    //共多少页
    totalPages() {
      return Math.ceil(this.total / this.pageSize);
    },
    //连续页码起始值
    continuesStartAndEnd() {
      const { pageNo, continues, totalPages } = this;
      let start = 0,
        end = 0;
      //连续页5代表页数至少5页，如果连续页>总页数
      if (continues > totalPages) {
        start = 1;
        end = totalPages;
      } else {
        //正常
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        //当pageNo过小使初始页<1
        if (start < 1) {
          start = 1;
          end = continues;
          //当pageNo过大使end大于总页码
        }
        if (end > totalPages) {
          start = totalPages - continues + 1;
          end = totalPages;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}

</style>
