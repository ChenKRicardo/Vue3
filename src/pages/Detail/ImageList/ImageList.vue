<template>
  <div class="swiper-container" ref="skuImageSwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(skuImage, index) in skuImageList"
        :key="skuImage.spuImgId"
      >
        <img
          :src="skuImage.imgUrl"
          @click="chageAcitiv(index)"
          :class="{ active: currentIndex === index }"
        />
      </div>
    </div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { mapGetters } from "vuex";
export default {
  name: "ImageList",
  props: ["skuImageList"],
  data() {
    return {
      currentIndex: "0",
    };
  },
  computed: {
    ...mapGetters(["skuInfo"]),
  },
  watch: {
    skuImageList: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          new Swiper(this.$refs.skuImageSwiper, {
            slidesPerView: 3,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
  methods: {
    chageAcitiv(index) {
      this.currentIndex = index;
      this.$bus.$emit("receiveImg", index);
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid rgb(133, 21, 21);
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
