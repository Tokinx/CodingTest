import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import vueDraggable from "vuedraggable";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.component("v-draggable", vueDraggable);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
