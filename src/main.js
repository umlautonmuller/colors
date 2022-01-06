import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/font-awesome";
import "./plugins/ui-kit";
import vuetify from "./plugins/vuetify";
import "./assets/styles/app.scss";

Vue.config.productionTip = false;

new Vue({
  router: router,
  store: store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
