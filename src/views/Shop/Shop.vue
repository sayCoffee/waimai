<template>
  <div class="shop">
    <div class="shop_nav">
        <nav class="shop_top">
            <i class="iconfont icon-zuo" @click="$router.go(-1)"></i>
        </nav>
        <div class="shop_title" @click="showModal()">
            <img :src="info.avatar" class="title_img">
            <div class="shop_name">
                <span class="brand">品牌</span>
                <span class="name">{{ info.name }}</span>
                <i class="iconfont icon-san"></i>
            </div>
            <div class="shop_info">
                <span>{{ info.score }}</span>
                <span>月售{{ info.sellCount }}单</span>
                <span>{{ info.description }}</span>
                <span>约{{ info.deliveryTime }}分钟</span>
                <span>距离{{ info.distance }}</span>
            </div>
        </div>
        <div class="shop_discount" @click="showOrder()">
            <span class="order">首单</span>
            <span class="user">新用户下单立减17元(不与其他活动同享)</span>
            <div class="rebate">
                <span>8个优惠</span>
                <i class="iconfont icon-jiao"></i>
            </div>
        </div>
        <!--点击店铺内容弹出的展示内容-->
        <van-dialog 
            v-model="show" 
            showConfirmButton 
            :closeOnClickOverlay="true" 
            class="shop_title_content"
        >
            <div class="shop_title_modal">
                <div class="modal_content">
                    <span class="modal_content_brand">品牌</span>
                    <span class="modal_content_name">{{ info.name }}</span>
                </div>
                <div class="modal_msg">
                    <div class="msg_list">
                        <p class="list_num">{{ info.score }}</p>
                        <p>评分</p>
                    </div>
                    <div class="msg_list">
                        <p class="list_num">{{ info.sellCount }}单</p>
                        <p>月售</p>
                    </div>
                    <div class="msg_list">
                        <p class="list_num">{{ info.description }}</p>
                        <p>约{{ info.deliveryTime }}分钟</p>
                    </div>
                    <div class="msg_list">
                        <p class="list_num">{{ info.deliveryPrice }}元</p>
                        <p>配送费用</p>
                    </div>
                    <div class="msg_list">
                        <p class="list_num">{{ info.distance }}</p>
                        <p>距离</p>
                    </div>
                </div>
                <div class="modal_info">
                    <p class="notice">
                        <span>公告</span>
                    </p>
                    <p class="notice_info">
                        {{ info.bulletin }}
                    </p>
                </div>
                <div class="modal_footer">
                    <i class="iconfont icon-guan"></i>
                </div>
            </div>
        </van-dialog>
        <!--点击优惠内容弹出的展示内容-->
        <van-popup
            v-model="showDiscount"
            closeable
            position="bottom"
            class="shop_discount_content"
        >
            <div class="shop_discount_activity">
                <div class="activity_title">优惠活动</div>
                <div class="activity_content">
                    <div v-for="(item, key) in info.supports" :key="key" class="activity_list">
                        <span class="list_tag" :class="listClass[item.type]">{{ item.name }}</span>
                        <span>{{ item.content }}</span>
                    </div>
                </div>
            </div>
        </van-popup>

        <div class="shop_tab">
            <div class="tab_item" v-for="(value, index) in navs" :key="index">
                <router-link :to="value.path">{{ value.name }}</router-link>
            </div>
        </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import { Dialog } from "vant";
import {mapState} from "vuex";
export default {
  components: {
      [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
        navs: [
            {
				name: '点餐',
				path: '/shop/goods'
            },
            {
				name: '评价',
				path: '/shop/ratings'
            },
            {
				name: '商家',
				path: '/shop/info'
            },
        ],
        show: false,
        showDiscount: false,
        listClass: [
            'list_green',
            'list_red',
            'list_orange',
            'list_green',
            'list_red',
            'list_orange',
            'list_green',
            'list_red'
        ]
    }
  },
  mounted() {
    this.$store.dispatch('getShopsInfo');
  },
  computed: {
    ...mapState(['info'])
  },
  methods: {
    showModal() {
        this.show = !this.show;
    },
    showOrder() {
        this.showDiscount = !this.showDiscount;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>

.shop
    height 100%
    background-color #f3f5f7
    .shop_nav
        background-color #ffffff
        width 100%
        .shop_top
            height 40px
            padding 5px 10px
            background-image url('../../assets/images/15.jpg')
            line-height 40px
            .icon-zuo
                font-size 20px
                color #ffffff
        .shop_title
            background-color #ffffff 
            padding 30px 20px 5px 20px
            text-align center
            position relative
            .title_img
                width 66px
                height 66px
                position absolute
                top 0
                left 50%
                margin-left -33px
                margin-top -40px
                border-radius 3px
            .shop_name
                margin-bottom 8px
                overflow hidden
                display inline-block
                line-height 30px
                .brand 
                    display inline-block
                    width 36px 
                    height 18px
                    line-height 18px
                    background-color #fff100
                    font-size 12px
                    color #6a3709
                    margin-right 10px
                    font-weight 600
                    float left
                    margin-top 6px
                .name
                    font-size 20px
                    color #333333
                    display inline-block
                    width 67%
                    text-overflow ellipsis
                    overflow hidden
                    white-space nowrap
                    font-weight 700
                    float left
                .icon-san
                    font-size 30px
                    color #000000
                    float left
            .shop_info
                margin-bottom 5px
                font-size 11px
                color #333333
                height 12px
                span
                    margin-left 3px
                    margin-right 3px
        .shop_discount
            padding 5px 7px
            border 1px solid #eeeeee
            margin 0 30px
            font-size 11px
            color #666666
            border-radius 1px
            overflow hidden
            line-height 16px
            .order
                display inline-block
                width 25px
                height 13px
                margin-right 5px
                background-color #70bc46;
                color #ffffff
                font-size 9px
                font-weight 600
                line-height 13px
                text-align center
                float left
                margin-top 2px
            .user
                float left
            .rebate
                display inline-block
                float right 
                .icon-jiao
                    color #000000
                    opacity 0.57
                    float right 
        .shop_title_content 
            .shop_title_modal
                background-color #ffffff
                padding 25px 20px
                .modal_content
                    .modal_content_brand
                        display inline-block
                        width 36px
                        height 18px
                        background-color #fff100
                        border-radius 2px
                        font-size 12px
                        font-weight 600
                        color #6a3709
                        line-height 18px
                        text-align center
                        margin-right 10px
                        float left
                    .modal_content_name
                        font-size 18px
                        font-weight 600
                .modal_msg
                    overflow hidden
                    margin-top 20px
                    text-align center
                    .msg_list
                        float left
                        width 20%
                        font-size 12px
                        color #999999
                        .list_num
                            font-size 14px
                            font-weight 600
                            color #333333
                            margin-bottom 8px
                .modal_info
                    .notice
                        margin 15px auto 15px
                        text-align center
                        font-size 12px
                        color #999999
                        width 85px
                        background-image linear-gradient(90deg, #fff, #333 50%, #fff)
                        background-size 100% 1px
                        background-position 50% 50%
                        background-repeat no-repeat
                        >span
                            padding 0 6px
                            background-color #ffffff
                    .notice_info
                        font-size 13px
                        color #333333
                        line-height 1.54
                .modal_footer
                    width 30px
                    height 30px
                    border 1px solid rgba(255,255,255,0.7)
                    border-radius 50%
                    text-align center
                    line-height 30px
                    position absolute
                    bottom -60px
                    left 50%
                    margin-left -15px
                    .icon-guan
                        font-size 16px
                        color rgba(255,255,255,.7)

            .shop_modal_cover
                position absolute
                left 0
                right 0
                top 0
                bottom 0
                background-color rgba(0,0,0,.5)
        .shop_discount_content
            .shop_discount_activity
                background-color #ffffff
                padding 20px 30px 
                .activity_title
                    font-size 20px
                    font-weight 600
                    margin-bottom 20px
                    text-align center
                .activity_content
                    height 160px
                    font-size 16px
                    overflow-y auto
                    .activity_list
                        font-size 13px
                        margin-bottom 12px
                        .list_tag
                            display inline-block
                            width 36px
                            height 18px
                            border-radius 2px
                            margin-right 10px
                            color #ffffff
                            text-align center
                            line-height 18px
                            &.list_green
                                background-color #70bc46
                            &.list_red
                                background-color #f07373
                            &.list_orange
                                background-color #f1884f 
            .shop_discount_cover
                position absolute
                top 0
                left 0
                right 0
                bottom 0
                background-color rgba(0,0,0,0.5)
        .shop_tab
            background-color #ffffff
            height 40px
            line-height 40px
            text-align center
            border-bottom 1px solid #eeeeee
            .tab_item
                float left
                width 33.3%
                font-size 14px
                color #4d555d
                a
                    display block
                    position relative
                    &::after
                        content ''
                        width 35px
                        height 2px
                        position absolute
                        bottom 0
                        left 37%
                    &.router-link-active
                        color #02a774
                        &::after
                            background-color #02a774
        




</style>
