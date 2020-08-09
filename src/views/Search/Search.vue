<template>
  <div class="search">
    <HeaderTop title="搜索"/>
    <div class="search_input">
      <input type="text" placeholder="请输入商家名称" class="search_content" />
      <div class="search_submit">提交</div>
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

.search
  background-color #f5f5f5
  height 100%
  .search_input
    background-color #ffffff
    padding 12px 8px
    overflow hidden
    .search_content
      float left
      background-color #f2f2f2
      height 27px
      border 4px solid #f2f2f2
      width calc(100% - 16px - 64px - 4px)
      font-size 14px
      font-weight bold
    .search_submit
      float right 
      width 56px
      height 27px
      border 4px solid #02a774
      background-color #02a774
      color #ffffff
      font-size 16px
      text-align center
      line-height 27px
      font-weight bold
</style>
