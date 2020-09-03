import Vue from "vue";
import Vuetify from "vuetify";
import App from "./App.vue";
import router from "./router";
import "vuetify/dist/vuetify.min.css";
import "./assets/css/global.css";
import vuetify from "./plugins/vuetify";
import axios from 'axios';

Vue.prototype.$http=axios;
axios.defaults.baseURL='http://192.168.8.101:5000/v1/';
Vue.config.productionTip = false;
Vue.use(Vuetify);
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
