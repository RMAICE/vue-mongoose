import Vue from "vue";
import VueMoment from "vue-moment";
import VeeValidate from "vee-validate";

import App from "./App.vue";

import store from "./store";
import router from "./router";

import "bootstrap/dist/css/bootstrap.css";

Vue.use(VueMoment);
Vue.use(VeeValidate);

Vue.config.productionTip = false;

Vue.filter("capitalize", function(value) {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
