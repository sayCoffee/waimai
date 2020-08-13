<template>
  <div class="shop_ratings">
    <div class="ratings_head">
      <div class="ratings_head_left">
        <p class="score">{{ info.score }}</p>
        <p class="name">综合评分</p>
        <p class="rank">高于周边商家{{ info.rankRate }}%</p>
      </div>
      <div class="ratings_head_right">
        <div class="score-wrapper">
          <span class="title">服务态度</span>
          <van-rate v-model="info.serviceScore" readonly size="14" color="#f90"/>
          <span class="num">{{ info.serviceScore }}</span>
        </div>
        <div class="score-wrapper">
          <span class="title">商品评分</span>
          <van-rate v-model="info.foodScore" readonly size="14" color="#f90"/>
          <span class="num">{{ info.foodScore }}</span>
        </div>
        <div class="score-wrapper">
          <span class="title">送达时间</span>
          <span class="delivery">{{ info.deliveryTime }}分钟</span>
        </div>
      </div>
    </div>
    <div class="ratings_content">
      <div class="head">
        <div class="head_box" v-if="ratingsType.all">
          <div class="list" @click="setSelectType(ratingsType.all.id)" :class="{active: selectType === 2}">
            全部
            <span>{{ ratingsType.all.total }}</span>
          </div>
          <div class="list" @click="setSelectType(ratingsType.man.id)" :class="{active: selectType === 0}">
            满意
            <span>{{ ratingsType.man.total }}</span>
          </div>
          <div class="list" @click="setSelectType(ratingsType.bu.id)" :class="{active: selectType === 1}">
            不满意
            <span>{{ ratingsType.bu.total }}</span>
          </div>
        </div>
        <div class="switch" @click="toggleType()" :class="{on: showType}">
          <i class="iconfont icon-gou"></i>
          <span class="text">只看有内容的评价</span>
        </div>
      </div>
      <div>
      <div class="content">
        <ul>
          <li v-for="(item, key) in ratings" :key="key" class="content_list">
            <div class="content_img">
              <img :src="item.avatar">
            </div>
            <div class="content_name">
              <div class="name_box">
                <p class="name">{{ item.username }}</p>
                <p class="time">{{ item.rateTime }}</p>
              </div>
              <div class="star">
                <van-rate v-model="item.score" readonly size="11" color="#f90"/>
                <span class="star_num">{{ item.score }}</span>
              </div>
              <div class="description">{{ item.text }}</div>
              <div class="rating">
                <i class="iconfont " :class="item.rateType === 0 ? 'icon-good' : 'icon-bad'"></i>
                <p v-for="(value, index) in item.recommend" :key="index" class="rating_rice">
                  {{ value }}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      </div>
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
      selectData: {
        all: {
          total: 20,
          id: 2
        },
        man: {
          total: 16,
          id: 1
        },
        bu: {
          total: 4,
          id: 0
        }
      },
      details: [
        {
          src: require('../../assets/images/7.jpg'),
          name: '3******c',
          title: '不错,粥很好喝,我经常吃这一家,非常赞,以后也会常来吃,强烈推荐.',
          desc: [
            '南瓜粥',
            '甜粥',
            '南瓜粥',
            '甜粥',
            '南瓜粥',
            '甜粥',
            '南瓜粥',
            '甜粥',
            '南瓜粥',
            '甜粥',
          ],
          time: '2019-08-12 20:45:20',
          num: 20
        },
        {
          src: require('../../assets/images/7.jpg'),
          name: '3******c',
          title: '不错,粥很好喝,我经常吃这一家,非常赞,以后也会常来吃,强烈推荐.',
          desc: [
            '南瓜粥',
            '甜粥',
            '南瓜粥',
            '甜粥',
            '南瓜粥',
            '甜粥',
          ],
          time: '2019-08-12 20:45:20',
          num: 20
        },
        {
          src: require('../../assets/images/7.jpg'),
          name: '3******c',
          title: '不错,粥很好喝,我经常吃这一家,非常赞,以后也会常来吃,强烈推荐.',
          desc: [
            '南瓜粥',
            '甜粥',
            '南瓜粥',
            '甜粥',
            '南瓜粥',
            '甜粥',
          ],
          time: '2019-08-12 20:45:20',
          num: 20
        },

      ],
      selectType: 2, //2为全部，0为满意，1为不满意
      showType: true,
    }
  },
  mounted() {
    this.$store.dispatch('getRatingsType');
    this.getData();
  },
  computed: {
    ...mapState(['ratingsType', 'ratings', 'info'])
  },
  methods: {
    setSelectType(selectType) {
      this.selectType = selectType;
      this.getData();
    },
    toggleType() {
      this.showType = !this.showType;
      this.getData();
    },
    getData() {
      this.$store.dispatch('getShopsRatings', {
        selectType: this.selectType,
        showType: this.showType,
      });
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" ref="stylesheet/stylus" scoped>
.shop_ratings
  height calc(100% - 210px)
  overflow-y auto
  scrollbar-width none /* Firefox */
  &::-webkit-scrollbar 
    display: none /* Chrome Safari */
  .ratings_head
    padding 24px 0
    overflow hidden
    background-color #ffffff
    text-align center
    border-bottom 1px solid rgba(7,17,27,0.1)
    .ratings_head_left
      float left
      width 138px
      border-right 1px solid rgba(7,17,27,0.1)
      box-sizing border-box
      margin-right 24px
      .score
        margin-bottom 6px
        line-height 28px
        font-size 24px
        color #f90
      .name
        margin-bottom 8px
        font-size 12px
        color #07111b
      .rank 
        font-size 10px
        color #93999f
    .ratings_head_right
      float left
      text-align left
      .score-wrapper
        margin-bottom 8px
        .title
          font-size 12px
          color #07111b
        /deep/.van-rate 
          margin 0 12px
        .num
          font-size 12px
          color #f90
          float right
          margin-top 3px
          display block
        .delivery
          margin-left 12px
          font-size 12px
          color #93999f
  .ratings_content
    background-color #ffffff
    margin-top 18px
    .head 
      border-top 1px solid rgba(7,17,27,0.1)
      .head_box
        padding 18px
        overflow hidden
        .list
          float left
          padding 8px 12px
          font-size 12px
          background rgba(77,85,93,0.2)
          color #4d555d
          margin-right 8px
          line-height 16px
          border-radius 2px
          &.active
            color #ffffff
            background-color #02a774
          >span 
            margin-left 2px
      .switch
        padding 12px 18px
        line-height 24px
        border-bottom 1px solid rgba(7,17,27,0.1)
        color #93999f
        font-size 12px
        overflow hidden
        &.on
          .icon-gou
            color #02a774
        .icon-gou
          font-size 24px
          margin-right 4px
          float left
        .text
          float left
    .content
      padding 0 18px
      .content_list
        padding 18px 0
        overflow hidden
        .content_img
          width 28px
          height 28px
          border-radius 50%
          border 1px solid #eeeeee
          margin-right 12px
          overflow hidden
          float left
          img 
            width 100%
        .content_name
          float left
          width calc(100% - 42px)
          .name_box
            overflow hidden
            margin-bottom 4px
            font-size 10px
            color #07111b
            .name 
              float left
            .time
              float right 
              color #93999f
          .star
            margin-bottom 6px 
            overflow hidden 
            /deep/.van-rate
              float left
            .star_num
              margin-left 6px
              font-size 10px
              color #93999f
              float left
              margin-top 1px
          .description
            margin-bottom 8px
            line-height 18px
            color #07111b
            font-size 12px
          .rating
            overflow hidden
            font-size 9px
            line-height 16px
            .iconfont
              font-size 9px
              color #f5a100
              float left
              margin-right 8px
              &.icon-bad
                color #93999f
            .rating_rice
              float left
              padding 0 6px
              border 1px solid rgba(7,17,27,0.1)
              border-radius 1px
              color #93999f
              background #fff
              margin-right 8px
              margin-bottom 4px
</style>
