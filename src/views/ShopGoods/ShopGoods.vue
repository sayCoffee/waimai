<template>
  <div class="shop_goods">
    <div class="goods_content">
      <div class="goods_title">
        <ul>
          <li 
            v-for="(item, key) in goods" 
            :key="key" 
            :class="{current: key === currentIndex}"
            @click="clickItem(key)"
            class="menu_title">
            <div class="goods_tab">
              <img :src="item.icon" class="tab_img" v-if="item.icon">
              {{ item.name }}
            </div>
          </li>
        </ul>
      </div>
      <div class="goods_info">
        <ul ref="goodsUl">
          <li v-for="(value, index) in goods" :key="index">
            <div class="food_title">{{ value.name }}</div> 
            <div 
              v-for="(item, key) in value.foods" 
              :key="key" 
              @click="showFood(item, $event)"
              class="list_item">
              <div>
                <img :src="item.image">
                <div class="food_info">
                  <p class="food_info_name">{{ item.name }}</p>
                  <p class="desc">{{ item.description }}</p>
                  <p class="extra">
                    <span class="extra_num">月售{{ item.sellCount }}份</span>
                    <span>好评率{{ item.rating }}%</span>
                  </p>
                  <div class="food_price">
                    <span class="now">￥{{ item.price }}</span>
                    <div class="control">
                      <van-stepper 
                        :class="{ hideInput: !item.count }"
                        v-model="item.count" 
                        theme="round" 
                        button-size="20" 
                        disable-input
                        :min="0"
                        :show-minus="!!item.count"
                        :allow-empty="true" 
                        @change="onChange(item)"
                        />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    
    <!--底部购物车和购物车列表-->
    <div class="car_container">
      <div class="car_foot">
        <div class="goods_car" @click="showCarList()">
          <div class="car_left">
            <div class="car_box highlight">
              <i class="iconfont icon-car light"></i>
              <div class="car_num" v-if="total">{{ total }}</div>
            </div>
          </div>
          <div class="car_middle">
            <p class="car_price">￥{{ price }}</p>
            <p class="car_delivery">配送费￥{{ info.deliveryPrice }}元</p>
          </div>
          <div v-if="!price" class="car_right">￥20元起送</div>
          <div v-else-if="price < 20" class="car_right">还差￥{{ 20 - price }}元起送</div>
          <div v-else class="car_right book">结算</div>
        </div>
        <div class="car_list" v-if="showCar">
          <div class="list_head">
            <p class="car">购物车</p>
            <p class="empty" @click="clearCar()">清空</p>
          </div>
          <div class="list_content">
            <ul>
              <li v-for="(item, key) in cars" :key="key" class="list_box">
                <div class="list_name">{{ item.name }}</div>
                <div class=list_price>￥{{ item.price }}</div>
                <div class="list_control">
                  <van-stepper 
                    :class="{ hideInput: !item.count }"
                    v-model="item.count" 
                    theme="round" 
                    button-size="20" 
                    disable-input
                    @change="onChange(item)"
                    :min="0"
                    :show-minus="!!item.count"
                    :allow-empty="true" 
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="car_cover" @click="showCarList()" v-if="showCar"></div>
    </div>

    <!--点击店铺详情展示的细节内容-->
    <van-dialog v-model="show" closeOnClickOverlay :showConfirmButton="false" class="food">
      <div class="food_content">
        <div class="food_img">
          <img :src="food.image">
          <p class="sories">{{ food.info }}</p>
          <i class="iconfont icon-left" @click="showFood('', $event)"></i>
        </div>
        <div class="food_rice">
          <p class="rice">{{ food.name }}</p>
          <p class="sale">
            <span class="month_sale">月售{{ food.sellCount }}份</span>
            <span>好评率{{ food.rating }}%</span>
          </p>
        </div>
        <div class="food_price_box">
          <span class="price">￥{{ food.price }}</span>
          <div class="control">
            <van-stepper 
              :class="{ hideInput: !food.count }"
              v-model="food.count" 
              theme="round" 
              button-size="20" 
              disable-input
              :min="0"
              :show-minus="!!food.count"
              :allow-empty="true" />
          </div>
        </div>
      </div>
    </van-dialog>

  </div>
</template>

<script>
import {Dialog} from "vant";
import{mapState} from "vuex";

export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      show: false,
      food: {},
      cars: {}, //存放购物车列表
      showCar: false, //是否显示购物车列表
      total: 0, //总数量
      price: 0, //总价格
      tops: [], //存放右侧食品列表的高度
      scrollY: 0, //滚动高度
    }
  },
  mounted() {
    this.$store.dispatch('getShopsGoods');
    // console.log(document.getElementsByClassName('goods_info'));
    if(document.getElementsByClassName('goods_info')[0]) {
      document.getElementsByClassName('goods_info')[0].addEventListener('scroll', this.initHeight);
    }
  },
  computed: {
    ...mapState(['goods', 'info', 'carFoods']),
    // ...mapGetters(['totalCount', 'totalPrice'])
    currentIndex() {
      const {scrollY, tops} = this;
      const index = tops.findIndex((item, key) => {
        return scrollY >= item && scrollY < tops[key + 1];
      })
      return index;
    }
  },
  watch: {
    goods() {
      this.$nextTick(() => {
        const foodTops = [];
        let top = 0;
        foodTops.push(top);
        const lis = this.$refs.goodsUl.children;
        Array.prototype.slice.call(lis).forEach(li => {
          top += li.clientHeight;
          foodTops.push(top);
        })
        this.tops = foodTops;
      });
    }
  },
  methods: {
    showFood(item, event) {
      const { target: { tagName } } = event;
      if (tagName === 'INPUT' || tagName === 'BUTTON') {
        return;
      }
      this.show = !this.show;
      console.log(event);
      if (item) {
        this.food = item;
      }
    },
    onChange(item) {
      if (item.count) {
        this.cars[item.id] = item;
      } else {
        delete this.cars[item.id];
      }
      const { cars } = this;
      let total = 0;
      let price = 0;
      if (JSON.stringify(cars) !== '{}') {
        for (const key in cars) {
          const element = cars[key];
          total += element.count;
          price += (element.count * element.price);
        }
      } else {
        this.showCar = false;
      }
      this.total = total;
      this.price = price;
    },
    showCarList() {
      if(this.total) {
        this.showCar = !this.showCar;
      }
    },
    clearCar() {
      console.log(this.cars);
      const {cars} = this;
      for (const key in cars) {
        const element = cars[key];
        element.count = 0;
      }
      this.cars = {};
      this.total = 0;
      this.price = 0;
      this.showCar = false;
    },
    initHeight() {
      // const foodTops = [];
      // let top = 0;
      // foodTops.push(top);
      // const lis = this.$refs.goodsUl.children;
      // Array.prototype.slice.call(lis).forEach(li => {
      //   top += li.clientHeight;
      //   foodTops.push(top);
      // })
      // this.tops = foodTops;
      // console.log(this.tops);
      this.scrollY = Math.floor(document.getElementsByClassName('goods_info')[0].scrollTop);
      // console.log(this.scrollY);
    },
    clickItem(key){
      this.initHeight();
      const scrollR = this.tops[key];
      console.log(this.tops);
      console.log(key);
      console.log(scrollR);
      this.scrollY = scrollR;
      document.getElementsByClassName('goods_info')[0].scrollTo({
        top: scrollR, 
        behavior: 'smooth' 
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" ref="stylesheet/stylus" scoped>
@import "../../assets/stylus/mixins.styl"
.shop_goods
  background-color #f3f5f7
  height calc(100% - 210px)
  .goods_content
    height calc(100% - 48px)
    .goods_title
      width 80px
      height 100%
      overflow-y auto
      float left
      scrollbar-width none /* Firefox */
      &::-webkit-scrollbar 
        display none /* Chrome Safari */
      ul
        .menu_title 
          width 56px
          height 54px
          padding 0 12px
          line-height 54px
          &.current
            background-color #ffffff
            color #02a774
          .goods_tab
            font-size 12px
            bottom-border-1px(rgba(7, 17, 27, 0.1))
            .tab_img
              width 12px
              height 12px
              margin-right 2px
    .goods_info
      float right 
      width calc(100% - 80px)
      height 100%
      overflow-y auto
      background-color #ffffff
      scrollbar-width none /* Firefox */
      &::-webkit-scrollbar 
        display none /* Chrome Safari */
      ul
        li 
          overflow hidden
          .food_title
            height 26px
            line-height 26px
            font-size 12px
            border-left 2px solid #d9dde1
            color #93999f
            padding-left 14px
            background-color #f3f5f7
          .list_item
            margin 18px 
            background-color #ffffff
            overflow hidden
            padding-bottom 18px
            bottom-border-1px(rgba(7, 17, 27, 0.1))
            img 
              float left
              width 57px
              height 57px
              border 1px solid #d9dde1
              margin-right 10px
            .food_info
              float left
              width calc(100% - 69px)
              .food_info_name
                font-size 14px
                color #07111b
                margin 2px 0 8px 0
              .desc
                line-height 12px
                margin-bottom 8px
                font-size 10px
                color #93999f
              .extra
                font-size 10px
                color #93999f
                .extra_num
                  margin-right 12px
              .food_price
                line-height 24px
                font-weight 700
                overflow hidden
                .now 
                  font-size 14px
                  color #f01414
                .control
                  float right 
                  /deep/.van-stepper 
                    &.hideInput
                      .van-stepper__input
                        display none
                    .van-stepper__plus
                      background-color #02a774
                    .van-stepper__minus
                      border 1px solid #02a774
                      color #02a774
  .car_container
    .car_foot
      .goods_car
        width 100%
        height 48px
        background-color #141d27
        position fixed
        bottom 0
        left 0
        z-index 230
        color #ffffff
        box-sizing border-box
        position relative
        .car_left
          width 56px
          height 56px
          border-radius 50%
          background-color #141d27
          float left
          margin-left 12px
          margin-top -10px
          margin-right 12px
          padding 6px 
          box-sizing border-box
          position relative
          .car_box
            width 100%
            height 100%
            border-radius 50%
            background-color #2b343c
            text-align center
            line-height 44px
            &.highlight
              background-color #02a774
            .icon-car
              font-size 24px
              color #80858a
              &.light
                color #ffffff
            .car_num
              width 24px
              height 16px
              line-height 16px
              border-radius 16px
              position absolute
              top 0
              right 0
              background-color #f01414
              color #ffffff
              font-size 9px
              font-weight 700
              box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
        .car_middle
          float left
          font-size 10px
          .car_price
            font-size 16px
            font-weight 700
            margin-top 5px
            line-height 24px
          .car_delivery
            opacity 0.4
            margin-left -6px  
        .car_right
          float right 
          width 105px
          font-size 12px
          font-weight 700
          color #ffffff
          line-height 48px
          background-color #2b333b
          text-align center
          &.book
            background-color #02a774
      .car_list
        position absolute
        bottom 48px
        width 100%
        background-color #ffffff
        z-index 2
        .list_head
          height 40px
          line-height 40px
          padding 0 18px
          background-color #f3f5f7
          border-bottom 1px solid rgba(7,17,27,0.1)
          box-sizing border-box
          .car 
            float left
            color #07111b
            font-size 14px
          .empty
            float right
            font-size 12px
            color #00a0dc
        .list_content
          max-height 217px
          padding 0 18px
          overflow-y auto
          .list_box
            padding 12px 0
            overflow hidden
            position relative
            line-height 24px
            border-bottom 1px solid rgba(7,17,27,0.1)
            .list_name
              float left
              font-size 14px
              color #07111b
            .list_price
              position absolute
              right 90px
              bottom 12px
              font-size 14px
              color #f01414
              font-weight 700
            .list_control
              float right
              /deep/.van-stepper
                .van-stepper__plus
                  background-color #02a774
                .van-stepper__minus
                  border 1px solid #02a774
                  color #02a774
    .car_cover
      position fixed
      top 0
      left 0
      right 0
      bottom 0
      background rgba(7,17,27,0.6)
      z-index 1
      filter blur(10px)
  .food
    .food_content
      background-color #ffffff
      .food_img
        width 100%
        position relative
        img
          width 100%
        .sories
          position absolute
          left 0
          right 0
          bottom 0
          padding 0 10px 10px
          font-size 10px
          color #dddddd
        .icon-left
          position absolute
          left 0
          top 10px
          font-size 20px
          padding 10px
          color #ffffff
      .food_rice
        padding 18px
        .rice
          font-size 14px
          color #07111b
          font-weight 700
          margin-bottom 8px
        .sale
          font-size 10px
          color #93999f
          .month_sale
            margin-right 12px
      .food_price_box
        padding-left 18px
        padding-right 18px
        line-height 30px
        overflow hidden
        .price
          float left
          display block
          font-size 14px
          color #f01414
        .control
          float right 
          /deep/.van-stepper
            &.hideInput
              .van-stepper__input
                display none
            .van-stepper__plus
              background-color #02a774
            .van-stepper__minus
              border 1px solid #02a774
              color #02a774
          
    .food_cover
      position absolute
      top 0  
      left 0
      right 0
      bottom 0
      background-color rgba(0,0,0,0.5)
      






</style>
