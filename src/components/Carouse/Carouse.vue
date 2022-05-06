<template>
    <div class="swiper-container" id="floor1Swiper" ref="floor1Swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="carousel in floors" :key="carousel.id">
                <img :src="carousel.imgUrl" />
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>
<script>
import Swiper from 'swiper'
export default {
    name: 'Carouse',
    props: ['floors'],
    watch: {
        //因为floors从来没有改变所以无法进行监听
        floors: {
            immediate: true,//立即监听，不论数据有无变化
            //只能监听到数据已经有了,但是对于v-for动态渲染结构还无法确定
            handler() {
                this.$nextTick(() => {
                    new Swiper(this.$refs.floor1Swiper, {
                        autoplay: true,
                        loop: true, // 循环模式选项
                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true
                        },
                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                        // 如果需要滚动条
                        scrollbar: {
                            el: '.swiper-scrollbar',
                        },
                    });
                })
            }
        }
    }


}
</script>

<style>
</style>