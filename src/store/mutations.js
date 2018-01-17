import * as types from './types';

function calcChanges(prevPrice, tradePrice, recentPriceChange) {
  if (prevPrice > 0) {
    let change = 'same';

    if (prevPrice < tradePrice) {
      change = 'up';
    } else if (prevPrice > tradePrice){
      change = 'down';
    } else {
      return recentPriceChange;
    }

    recentPriceChange.push(change);

    if (recentPriceChange.length > 10) {
      recentPriceChange.shift();
    }
  }

  return recentPriceChange;
}
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
    const {prevUbitPrice = 0, prevUsdPrice = 0, recentUpbitPriceChange = [], recentUsdPriceChange = [] } = newCoin;

    let newRecentUpbitPriceChange = recentUpbitPriceChange;
    let newRecentUsdPriceChange = recentUsdPriceChange;

    switch (currency) {
      case 'KRW':
        newCoin.upbitPrice = tradePrice;
        newRecentUpbitPriceChange = calcChanges(prevUbitPrice, newCoin.upbitPrice, recentUpbitPriceChange);
            break;
      case 'USDT':
        newCoin.usdPrice = tradePrice;
        newRecentUsdPriceChange = calcChanges(prevUsdPrice, newCoin.usdPrice, recentUsdPriceChange);
            break;
      default:
        return;
    }

    if (newCoin.usdPrice > 0 && state.usdKwrPrice > 0) {
      newCoin.usdKwrPrice = newCoin.usdPrice * state.usdKwrPrice;
    }

    newCoin.prevUbitPrice = newCoin.upbitPrice;
    newCoin.prevUsdPrice = newCoin.usdPrice;

    newCoins[index] = {
      ...newCoin,
      code,
      signedChangePrice,
      signedChangeRate,
      change,
      recentUpbitPriceChange: newRecentUpbitPriceChange,
      recentUsdPriceChange: newRecentUsdPriceChange,
    };

    state.coins = newCoins;
  },
  [types.SET_UDS_KWR_PRICE](state, usdKwrPrice) {
    state.usdKwrPrice = usdKwrPrice;
  }
};
