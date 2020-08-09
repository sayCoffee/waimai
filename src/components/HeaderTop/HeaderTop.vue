<template>
  <div class="header_top">
    <header class="head">{{ title }}</header>
  </div>
</template>

<script>
export default {
    props: {
      title: String
    },  
    data() {
        return {
      
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" ref="stylesheet/stylus" scoped>

.header_top
    .head
      width 100%
      height 45px
      background-color #02a774
      color #ffffff
      font-size 20px
      text-align center
      line-height 45px
</style>
