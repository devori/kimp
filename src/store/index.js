import Vue from 'vue';
import Vuex from 'vuex';
import actions from './action';
import mutations from './mutations';
import getters from './getters';
import {COIN_LIST} from '../constants';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    coins: [...COIN_LIST],
    orderBookCoins: [...COIN_LIST],
    usdKwrPrice: 0,
  },
  getters,
  mutations,
  actions,
});
