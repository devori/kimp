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
  }
}
