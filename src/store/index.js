import Vue from 'vue';
import Vuex from 'vuex';
import actions from './action';
import mutations from './mutations';
import {COIN_LIST} from '../constants';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    coins: [...COIN_LIST],
    usdKwrPrice: 0,
  },
  getters: {
    viewCoins: (state) => {
      return state.coins.map(({
        name,
        abbr,
        change,
        upbitPrice = '-',
        usdPrice = '-',
        usdKwrPrice = '-',
        signedChangeRate = '-',
      }) => {
        let kimp = '-';

        if(upbitPrice > 0 && usdKwrPrice > 0) {
          kimp = `${(((upbitPrice / usdKwrPrice) * 100) - 100).toString().substr(0, 6)}%`;
        }
        return {
          name: `${name}(${abbr})`,
          upbitPrice,
          usdPrice,
          usdKwrPrice: usdKwrPrice,
          change,
          signedChangeRate: `${(signedChangeRate * 100).toString().substr(0, 6)}%`,
          kimp,
        }
      });
    }
  },
  mutations,
  actions,
});
