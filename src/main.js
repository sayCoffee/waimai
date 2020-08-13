import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/iconfont/iconfont.css";
import "@/assets/styles/reset.css";
import { Swipe, SwipeItem } from "vant";
import { Rate } from "vant";
import { Popup } from "vant";
import { Stepper } from "vant";





Vue.use(Stepper);
Vue.use(Popup);
Vue.use(Rate);
Vue.use(Swipe);
Vue.use(SwipeItem);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
