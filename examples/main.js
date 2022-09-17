import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import globComponents from "../packages";

Vue.config.productionTip = false;
Vue.use(globComponents);
Vue.use(Element, { size: "small" });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
