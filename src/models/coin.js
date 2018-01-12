const default_data = {
  "openingPrice": 2145.00000000,
  "highPrice": 2375.00000000,
  "lowPrice": 1800.00000000,
  "tradePrice": 2295.0,
  "prevClosingPrice": 2145.00000000,
  "accTradePrice": 82975378667.714378650,
  "accTradePrice24h": 106627030354.91943215,
  "change": "RISE",
  "changePrice": 150.00000000,
  "signedChangePrice": 150.00000000,
  "changeRate": 0.0699300699,
  "signedChangeRate": 0.0699300699,
  "askBid": "BID",
  "tradeVolume": 898.62055871,
  "accTradeVolume": 38709805.91337880,
  "accTradeVolume24h": 50489324.45824989,
  "tradeDate": "20180112",
  "tradeTime": "144912",
  "tradeTimestamp": 1515768552000,
  "accAskVolume": 5170272.78725457,
  "accBidVolume": 33539533.12612423,
  "highest52WeekPrice": 3165.00000000,
  "highest52WeekDate": "2018-01-07",
  "lowest52WeekPrice": 243.00000000,
  "lowest52WeekDate": "2017-11-14",
  "tradeStatus": "PREVIEW",
  "marketState": "ACTIVE",
  "marketStateForIOS": "UNAVAILABLE",
  "isTradingSuspended": false,
  "delistingDate": null,
  "type": "recentCrix",
  "code": "CRIX.UPBIT.KRW-POWR",
  "timestamp": 1515768554073,
  "streamType": "REALTIME"
}

export const convertCoinToViewModel = (coin) => {
  const {code, tradePrice, signedChangePrice, signedChangeRate, change} = coin;
  const [currency, abbr] = code.split('.')[2].split('-');

  return {
    code,
    abbr,
    currency,
    tradePrice,
    signedChangePrice,
    signedChangeRate,
    change,
  }
};
