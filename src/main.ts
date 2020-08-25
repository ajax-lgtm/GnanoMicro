import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import fastclick from 'fastclick';
import VueLazyload from 'vue-lazyload';
import vuetify from './plugins/vuetify';

// import '@/assets/reset.css';

Vue.config.productionTip = false;
// fastclick.attach(document.body);

Vue.use(VueLazyload, {
  loading: require('@/assets/image/default.png')
});

new Vue({
  router,

  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
