<template>
  <div class="profile">
    <HeaderTop title="我的"/>
    <div class="profile_section">
      <div class="profile_login">
        <div class="profile_left">
          <i class="iconfont icon-person"></i>
        </div>
        <div class="profile_right">
          <div class="profile_info">
            <p class="user">登录/注册</p>
            <p class="user_photo">
              <i class="iconfont icon-iPhone"></i>
              <span>暂无绑定手机号</span>
            </p>
          </div>
          <div class="profile_arrow">
            <i class="iconfont icon-you"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="profile_data">
      <div class="profile_data_info">
        <div class="data_info">
          <p class="info">
            <span class="money">0.00</span>
            元
          </p>
          <p class="my">我的余额</p>
        </div>
        <div class="data_info">
          <p class="info">
            <span class="num">0</span>
            个
          </p>
          <p class="my">我的优惠</p>
        </div>
        <div class="data_info">
          <p class="info">
            <span class="integral">0</span>
            分
          </p>
          <p class="my">我的积分</p>
        </div>
      </div>
    </div>
    <div class="profile_order">
      <div class="order_list">
        <i class="iconfont icon-order"></i>
        <span>我的订单</span>
        <i class="iconfont icon-right"></i>
      </div>
      <div class="order_list">
        <i class="iconfont icon-fen"></i>
        <span>积分商城</span>
        <i class="iconfont icon-right"></i>
      </div>
      <div class="order_list">
        <i class="iconfont icon-vip"></i>
        <span>外卖会员卡</span>
        <i class="iconfont icon-right"></i>
      </div>
    </div>
    <div class="profile_order">
      <div class="order_list">
        <i class="iconfont icon-serve"></i>
        <span>服务中心</span>
        <i class="iconfont icon-right"></i>
      </div>
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
.profile
  height 100%
  background-color #f5f5f5
  .profile_section
    border-top 1px solid #ffffff
    overflow hidden
    .profile_login
      padding 20px 10px
      background-color #02a774
      overflow hidden
      .profile_left
        float left
        width 60px
        height 60px
        border-radius 50%
        overflow hidden
        background-color #7e8c8d
        .icon-person
          font-size 62px
          color #e4e4e4
      .profile_right
        float right
        width calc(100% - 20px - 60px)
        position relative
        color #ffffff
        .profile_info
          margin-top 8px 
          .user
            font-weight 700
            font-size 18px
            padding-bottom 12px
          .user_photo
            font-size 14px
            .icon-iPhone
              font-size 20px
              margin-left -4px
        .profile_arrow
          position absolute
          right 0
          top 20px
          z-index 1
          .icon-you
            font-size 14px
  .profile_data
    background-color #ffffff
    margin-bottom 10px
    .profile_data_info
      padding-top 15px
      padding-bottom 10px
      overflow hidden
      .data_info
        float left
        width 33.3%
        text-align center
        font-size 14px
        border-right 1px solid #f1f1f1
        box-sizing border-box
        &:last-child
          border-right none
        .info
          padding-bottom 10px
          >span
            font-size 30px
            font-weight 700
          .money
            color #f90
          .num
            color #ff5f3e
          .integral
            color #6ac20b
        .my 
          font-size 14px
          color #666666
          font-weight 400
  .profile_order   
    background-color #ffffff
    margin-bottom 10px   
    .order_list
      padding 18px 10px 18px 15px
      font-size 16px 
      color #333333
      border-bottom 1px solid #f1f1f1
      line-height 30px
      .iconfont
        font-size 30px
        margin-left -10px
        float left
      .icon-order
        color #02a774
      .icon-fen
        color #ff5f3e
      .icon-vip
        color #f90
      .icon-right
        float right 
        font-size 14px
        color #bbbbbb
      .icon-serve
        color #02a774
          



</style>
