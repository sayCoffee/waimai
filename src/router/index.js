import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/msite",
    name: "Msite",
    component: () => import("../views/Msite/Msite.vue")
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../views/Search/Search.vue")
  },
  {
    path: "/order",
    name: "Order",
    component: () => import("../views/Order/Order.vue")
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile/Profile.vue")
  },
  {
    path: "/",
    redirect: "/msite"
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
