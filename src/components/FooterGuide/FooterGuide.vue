<template>
  <div class="footer">
    <router-link
      :to="{path: item.path}" 
      v-for="(item, index) in foots" 
      :key="index" 
      :class="{on: item.path === $route.path}"
      class="footer_title"
    >
      <i class="iconfont" :class="item.icon"></i>
      <p>{{ item.name }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      foots: [
        {
          icon: 'icon-U',
          name: '首页',
          path: '/msite'
        },
        {
          icon: 'icon-sou',
          name: '搜索',
          path: '/search'
        },
        {
          icon: 'icon-dan',
          name: '订单',
          path: '/order'
        },
        {
          icon: 'icon-person',
          name: '我的',
          path: '/profile'
        }
      ]
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" ref="stylesheet/stylus" scoped>
@import "../../assets/stylus/mixins.styl"
.footer
  position fixed
  left 0
  right 0
  bottom 0
  height 50px
  border-top 1px solid #e4e4e4
  z-index 100
  background-color #ffffff
  .footer_title
    width 25% 
    height 100%
    float left
    text-align center
    padding-top 5px
    color #999999
    display block
    &.on
      color #02a774
    .iconfont
      font-size 22px
    p 
      font-size 12px
      padding-top 5px

</style>
