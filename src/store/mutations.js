import * as types from './types';

export default {
  [types.UPDATE_COIN](state, {
    code,
    abbr,
    change,
    currency,
    tradePrice,
    signedChangePrice,
    signedChangeRate,
  }) {
    const newCoins = [...state.coins];
    const index = newCoins.findIndex((coin) => abbr === coin.abbr);
    const newCoin = {...newCoins[index]};

    switch (currency) {
      case 'KRW':
        newCoin.upbitPrice = tradePrice;
            break;
      case 'USDT':
        newCoin.usdPrice = tradePrice;
            break;
      default:
        return;
    }

    if (newCoin.usdPrice > 0 && state.usdKwrPrice > 0) {
      newCoin.usdKwrPrice = newCoin.usdPrice * state.usdKwrPrice;
    }

    newCoins[index] = {...newCoin, code, signedChangePrice, signedChangeRate, change};

    state.coins = newCoins;
  },
  [types.SET_UDS_KWR_PRICE](state, usdKwrPrice) {
    state.usdKwrPrice = usdKwrPrice;
  }
};
