<template>
  <div id="app">
    <router-view :class="{ showFoot: $route.meta.showFooter }" />
    <FooterGuide v-if="$route.meta.showFooter"/>
  </div>
</template>


<script>
import FooterGuide from '@/components/FooterGuide/FooterGuide.vue'
export default {
  components: {
    FooterGuide
  },
  data() {
    return {
      
    }
  }
};
</script>

<style lang="stylus" ref="stylesheet/stylus" scoped>
#app
  height 100%
  overflow-y auto
  scrollbar-width none /* Firefox */
  &::-webkit-scrollbar
    display none /* Chrome Safari */
  .showFoot
    padding-bottom 50px
    box-sizing border-box
</style>
