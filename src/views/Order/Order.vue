<template>
  <div class="order">
    <HeaderTop title="订单列表"/>
    <div class="order_content">
      <img src="../../assets/images/person.png">
      <p>登录后查看外卖订单</p>
      <div class="order_login">立即登录</div>
    </div>
  </div>
</template>

<script>
import HeaderTop from "@/components/HeaderTop/HeaderTop.vue";
export default {
  components: {
    HeaderTop
  },
  data() {
    return {
      
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" ref="stylesheet/stylus" scoped>
.order
    background-color #f5f5f5
    height 100%
  .order_content
    text-align center
    padding-top 100px
    width 60% //兼容性，手机屏幕的改变
    margin 0 auto
    img 
      width 100%
    p 
      font-size 17px
      color #6a6a6a
      padding 10px 0
    .order_login
      width 96px
      background-color #02a774
      font-size 14px
      color #fff
      padding 10px 20px
      box-sizing border-box
      border-radius 5px
      margin 0 auto
</style>
