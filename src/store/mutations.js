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
  },
  [types.UPDATE_ORDER_BOOK](state, {code, abbr, currency, orderbookUnits}) {
    const newCoins = [...state.orderBookCoins];
    const index = newCoins.findIndex((coin) => abbr === coin.abbr);
    const newCoin = {...newCoins[index]};

    //kwrSellPrice

    const firstOrderBookUnit = orderbookUnits[0];

    switch (currency) {
      case 'KRW':
        newCoin.kwrSellPrice = firstOrderBookUnit.askPrice;
        newCoin.kwrBuyPrice = firstOrderBookUnit.bidPrice;
        newCoin.kwrSellSize = firstOrderBookUnit.askSize;
        newCoin.kwrBuySize = firstOrderBookUnit.bidSize;
        newCoin.kwrSellVolume = newCoin.kwrSellPrice * newCoin.kwrSellSize;
        newCoin.kwrBuyVolume = newCoin.kwrBuyPrice * newCoin.kwrBuySize;
        break;
      case 'USDT':
        newCoin.usdtSellPrice = firstOrderBookUnit.askPrice * state.usdKwrPrice;
        newCoin.usdtBuyPrice = firstOrderBookUnit.bidPrice * state.usdKwrPrice;
        newCoin.usdtSellSize = firstOrderBookUnit.askSize;
        newCoin.usdtBuySize = firstOrderBookUnit.bidSize;
        newCoin.usdtSellVolume = newCoin.usdtSellPrice * newCoin.usdtSellSize;
        newCoin.usdtBuyVolume = newCoin.usdtBuyPrice * newCoin.usdtBuySize;
        break;
      default:
        return;
    }

    newCoins[index] = {
      ...newCoin,
    };

    state.orderBookCoins = newCoins;
  }
};
