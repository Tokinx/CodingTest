import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import vueDraggable from "vuedraggable";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.component("v-draggable", vueDraggable);

Vue.prototype.$http = (type = "GET", url = "", fn, data = {}) => {
  let request = new XMLHttpRequest();
  let queryString = Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
  if (type == "POST") {
    const formHeader = "application/x-www-form-urlencoded; charset=UTF-8";
    request.setRequestHeader("Content-Type", formHeader);
  }
  if (type == "GET") {
    url = `${url}?${queryString}`;
  }
  request.open(type, url, true);
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      fn & fn(this.status >= 200 && this.status < 400, this);
    }
  };
  request.send(queryString);
  request = null;
};

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
