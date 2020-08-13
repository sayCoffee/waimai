<template>
  <div class="msite">
    <header class="msite_head">
      <i class="iconfont icon-search"></i>
      <span class="address">{{ address.name }})</span>
      <span class="login">登录|注册</span>
    </header>

    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#02a774" v-if="foodsArr">
      <van-swipe-item v-for="(item, key) in foodsArr" :key="key">
        <div class="msite_nav">
          <div 
            v-for="(value, index) in item" 
            :key="index"
            class="nav_content">
            <img :src="value.image">
            <p class="nav_title">{{ value.name }}</p>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>

    <div class="shops">
      <div class="shop_nearby">
        <i class="iconfont icon-chioce"></i>
        <span class="nearby">附近商家</span>
      </div>
      <div class="shops_content">
        <ul>
          <router-link v-for="(item, key) in shops" :key="key" class="shops_list" tag="li" :to="{path: '/shop' }">
            <div class="content_left">
              <img :src="item.image_path">
              <span>品牌</span>
            </div>
            <div class="content_right">
              <div class="store_top">
                <span class="brand">{{ item.name }}</span>
                <span class="store_rule">{{ item.ticket }}</span>
              </div>
              <div class="store_middle">
                <span class="store_score">{{ item.rating }}</span>
                <span class="store_num">月售{{ item.recent_order_num }}单</span>
                <van-rate v-model="item.rating" :size="10" color="#ff6000" readonly :allow-half="true"/>
                <span class="store_title">{{ item.delivery_mode.text }}</span>
              </div>
              <div class="store_bottom">
                <span>￥{{ item.float_minimum_order_amount }}起送</span>
                <span>/</span>
                <span>配送费约￥{{ item.float_delivery_fee }}</span>
              </div>
            </div>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  data() {
    return {
      foodsArr: []
    }
  },
  mounted() {
    this.getFoodsArr();
    this.$store.dispatch('getAddress');
    this.$store.dispatch('getCategorys');
    this.$store.dispatch('getShops');
  },
  computed: {
    ...mapState(['address', 'categorys', 'shops'])
  },
  watch: {
    categorys() {
      this.getFoodsArr();
    }
  },
  methods: {
    getFoodsArr() {
      const {foodsArr, categorys} = this;
      let minArr = [];
      for (const item of categorys) {
        if(minArr.length === 8) {
          minArr = [];
        }
        if(!minArr.length) {
          foodsArr.push(minArr)
        }
        minArr.push(item)
      }
      // console.log(foodsArr)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" ref="stylesheet/stylus" scoped>
.msite
  background-color #f5f5f5
  width 100%
  .msite_head
    background-color #02a774
    height 45px
    padding-left 15px
    padding-right 15px
    line-height 45px
    color #ffffff
    text-align center
    overflow hidden
    position fixed
    top 0
    left 0
    z-index 1
    .icon-search
      font-size 25px
      float left
    .address
      font-size 20px
      display inline-block
      width 50%
      line-height 20px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      padding-top 12px
    .login
      float right 
      font-size 14px
  /deep/.my-swipe
    height 200px
    padding-top 45px
    .msite_nav
      height 100% //高度要给最大的容器
      text-align center
      overflow hidden
      background-color #ffffff
      .nav_content
        width 25%
        float left
        margin-bottom 20px
        img 
          width 50px
          height 50px
  .shops
    margin-top 10px
    background-color #ffffff
    .shop_nearby
      padding-top 15px     
      padding-left 10px
      color #999999 
      .icon-chioce
        margin-right 5px
        font-size 14px
      .nearby
        line-height 20px
        font-size 14px
  .shops_content
    ul 
      .shops_list
        padding 15px 8px
        overflow hidden
        .content_left
          width 82px
          height 75px
          float left
          margin-right 10px
          position relative
          border-radius 6px
          overflow hidden
          >span 
            position absolute
            top 0
            right 0
            display inline-block
            font-size 11px
            line-height 11px
            color #333
            background-color #ffd930
            padding 2px
            border-radius 2px
          img 
            width 100%
            height 100%
        .content_right
          float left
          width calc(100% - 92px)
          .store_top
            padding-bottom 18px
            .brand
              color #333
              font-size 16px
              line-height 16px
              font-weight 700
            .store_rule
              float right
              font-size 10px
              color #999999
              display inline-block
              border 1px solid #f5f5f5
              padding 1px
          .store_middle
            padding-bottom 10px
            .store_score 
              font-size 11px
              color #ff6000
              margin-right 4px
            .store_num
              font-size 10px
              color #666666
              margin-right 4px
            .store_title
              float right
              font-size 8px
              color #02a774
              border 1px solid #02a774
              padding 1px
          .store_bottom
            font-size 11px
            color #666666
</style>
