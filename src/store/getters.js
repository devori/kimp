export default {
  viewCoins: (state) => {
    return state.coins.map(({
      name,
      abbr,
      change,
      upbitPrice = '-',
      usdPrice = '-',
      usdKwrPrice = '-',
      signedChangeRate = '-',
      recentUpbitPriceChange,
      recentUsdPriceChange,
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
        recentUpbitPriceChange,
        recentUsdPriceChange,
      }
    });
  },
  viewOrderBookCoins: ({orderBookCoins}) => {
    return orderBookCoins.map(coin => {
      if(coin.usdtSellPrice === 0) {
        coin.usdtSellPrice = 1000000000;
      }

      coin.sellKimp = (((coin.kwrBuyPrice / (coin.usdtSellPrice)) * 100) - 100).toString().substr(0, 6) + '%';
      coin.buyKimp = (((coin.kwrSellPrice / (coin.usdtBuyPrice)) * 100) - 100).toString().substr(0, 6) + '%';

      return coin;
    })
  }
}
