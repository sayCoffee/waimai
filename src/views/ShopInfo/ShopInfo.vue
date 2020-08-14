<template>
  <div class="shop_info">
    <div class="shop_info_head">
      <p class="head_title">配送信息</p>
      <div class="head_delivery">
        <span class="delivery">{{ info.description }}</span>
        <span>由商家配送提供配送，约{{ info.deliveryTime }}分钟送达，距离{{ info.distance }}</span>
      </div>
      <p class="delivery_price">配送费￥{{ info.deliveryPrice }}元</p>
    </div>

    <div class="shop_info_activity">
      <p class="service">活动与服务</p>
      <div class="activity_box">
        <div v-for="(item, key) in info.supports" :key="key" class="activity_list">
          <p class="order_name" :class="list[item.type]">{{ item.name }}</p>
          <p class="order_title"> {{ item.content }}</p>
        </div>
      </div>
    </div>

    <div class="shop_info_img">
      <p class="img_title">商家实景</p>
      <div class="img_box">
        <ul :style="{width: `${(120 + 6) * info.pics.length - 6}px`}" v-if="info.pics">
          <li v-for="(value, index) in info.pics" :key="index" class="img_list">
            <img :src="value">
          </li>
        </ul>
      </div>
    </div>

    <div class="shop_info_foot">
      <p class="info_title">商家信息</p>
      <ul>
        <li class="info_list">
          <span class="info_left">品类</span>
          <span class="info_right">{{ info.category }}</span>
        </li>
        <li class="info_list">
          <span class="info_left">商家电话</span>
          <span class="info_right">{{ info.phone }}</span>
        </li>
        <li class="info_list">
          <span class="info_left">地址</span>
          <span class="info_right">{{ info.address }}</span>
        </li>
        <li class="info_list">
          <span class="info_left">营业时间</span>
          <span class="info_right">{{ info.workTime }}</span>
        </li>
      </ul>
    </div>


  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  components: {
  },
  data() {
    return {
      list: [
        'list_green',
        'list_red',
        'list_orange',
        'list_green',
        'list_red',
        'list_orange',
        'list_red',
      ],
    }
  },
  mounted() {
    
  },
  computed: {
    ...mapState(['info']),
  },
  watch: {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" ref="stylesheet/stylus" scoped>
.shop_info
  height calc(100% - 210px)
  overflow-y auto
  scrollbar-width none /* Firefox */
  &::-webkit-scrollbar 
    display: none /* Chrome Safari */
  background-color #f5f5f5
  .shop_info_head
    padding 16px 14px 14px
    font-size 16px
    background-color #fff
    color #666
    border-bottom 1px solid #eee
    margin-bottom 16px
    .head_title
      color #000
      font-weight 700
      margin-bottom 16px
    .head_delivery
      font-size 13px
      margin-bottom 5px
      line-height 18px
      .delivery
        display inline-block
        width 55px
        background-color #0097ff
        color #fff
        border-radius 4px
        padding 1px 0
        font-size 11px
        margin-right 11px
        text-align center
    .delivery_price
      font-size 13px
      line-height 18px
  .shop_info_activity
    background-color #fff
    border 1px solid #eee
    padding 16px 14px 14px
    font-size 16px
    color #666
    border-bottom 1px solid #eee
    margin-bottom 16px
    .service
      color #000
      font-weight 700
      margin-bottom 16px
    .activity_box
      .activity_list
        padding-bottom 12px
        font-size 13px
        overflow hidden
        .order_name
          float left
          width 36px
          height 18px
          line-height 18px
          margin-right 10px
          color #fff
          text-align center
          border-radius 2px
          background-color #70bc46
          &.list_green
            background-color #70bc46
          &.list_red
            background-color #f07373
          &.list_orange
            background-color #f1884f
        .order_title
          float left
          width calc(100% - 46px)
          line-height 18px
  .shop_info_img
    border-top 1px solid #eee
    background-color #fff
    padding 16px 14px 14px
    margin-bottom 16px
    border-bottom 1px solid #eee
    .img_title
      color #000
      font-size 16px
      font-weight 700
      margin-bottom 16px
    .img_box
      width 100%
      overflow-x auto
      scrollbar-width none /* Firefox */
      &::-webkit-scrollbar 
        display none /* Chrome Safari */
      ul 
        overflow hidden
        .img_list
          float left
          width 120px
          height 90px
          margin-right 6px
          &:last-child
            margin-right 0
          img 
            width 100%
            height 100%
  .shop_info_foot
    border-top 1px solid #eee
    background-color #fff
    padding 16px 14px 0 14px 
    .info_title
      font-size 16px
      font-weight 700
      color #000
    ul 
      .info_list
        padding 16px 12px 16px 0
        font-size 13px
        border-bottom 1px solid #eee
        &:last-child
          border none
        .info_left
          font-weight 700
          color #333
        .info_right
          float right 



</style>
