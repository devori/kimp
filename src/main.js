// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import {sync} from 'vuex-router-sync';
import Vuetify from 'vuetify';
import router from './router';
import store from './store';

import VueCurrencyFilter from "vue-currency-filter";
import vueHeadful from 'vue-headful';

Vue.component('vue-headful', vueHeadful);

Vue.use(Vuetify);
Vue.use(VueCurrencyFilter,
  {
    symbol : '',
    thousandsSeparator: ',',
    fractionCount: 0,
    fractionSeparator: '..',
    symbolPosition: 'read',
    symbolSpacing: true
  })
Vue.config.productionTip = false;

sync(store, router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App},
});
