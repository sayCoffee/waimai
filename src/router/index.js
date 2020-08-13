import Vue from "vue";
import VueRouter from "vue-router";
import Shop from "../views/Shop/Shop.vue";
import ShopGoods from "../views/ShopGoods/ShopGoods.vue";
import ShopRatings from "../views/ShopRatings/ShopRatings.vue";
import ShopInfo from "../views/ShopInfo/ShopInfo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/msite",
    name: "Msite",
    component: () => import("../views/Msite/Msite.vue"),
    meta: {
      showFooter: true
    }
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../views/Search/Search.vue"),
    meta: {
      showFooter: true
    }
  },
  {
    path: "/order",
    name: "Order",
    component: () => import("../views/Order/Order.vue"),
    meta: {
      showFooter: true
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile/Profile.vue"),
    meta: {
      showFooter: true
    }
  },
  {
    path: "/",
    redirect: "/msite"
  },
  {
    path: "/shop",
    name: "Shop",
    component: Shop,
    children: [
      {
        path: "/shop/goods",
        name: "ShopGoods",
        component: ShopGoods
      },
      {
        path: "/shop/ratings",
        name: "ShopRatings",
        component: ShopRatings
      },
      {
        path: "/shop/info",
        name: "ShopInfo",
        component: ShopInfo
      },
      {
        path: "/shop",
        redirect: "/shop/goods"
      }
    ]
  },
  
  
  

  // {//路由懒加载
  //   path: "/about",
  //   name: "About",
  //   component: () => import("../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
