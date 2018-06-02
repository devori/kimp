export const BASE_EXCHANGE_RATIO = 1070;

export const COIN_CURRENCY = [
  "KWR",
  "USD",
  "JPY",
  "CNY",
  "EUR",
  "USDT",
];

export const COIN_SITE = [
  "UPBIT",
  "BITFINEX",
  "OKCOIN",
  "KRAKEN",
];

export const COIN_LIST = [
  { name: "비트코인", abbr: "BTC" },
  { name: "이더리움", abbr: "ETH" },
  { name: "리플", abbr: "XRP" },
  { name: "비트코인캐시", abbr: "BCC" },
  { name: "네오", abbr: "NEO" },
  { name: "에이다", abbr: "ADA" },
  { name: "라이트코인", abbr: "LTC" },
  { name: "이더리움클래식", abbr: "ETC" },
  { name: "지캐시", abbr: "ZEC" },
  { name: "오미세고", abbr: "OMG" },
  { name: "비트코인골드", abbr: "BTG" },
  { name: "시아코", abbr: "SC" },
  { name: "모네로", abbr: "XMR" },
  { name: "대시", abbr: "DASH" },
  { name: "트론", abbr: "TRX" },
];

export const COIN_CODES_USDT = [
  "CRIX.UPBIT.USDT-BTC",
  "CRIX.UPBIT.USDT-ETH",
  "CRIX.UPBIT.USDT-XRP",
  "CRIX.UPBIT.USDT-BCC",
  "CRIX.UPBIT.USDT-NEO",
  "CRIX.UPBIT.USDT-ADA",
  "CRIX.UPBIT.USDT-LTC",
  "CRIX.UPBIT.USDT-ETC",
  "CRIX.UPBIT.USDT-ZEC",
  "CRIX.UPBIT.USDT-OMG",
  "CRIX.UPBIT.USDT-BTG",
  "CRIX.UPBIT.USDT-SC",
  "CRIX.UPBIT.USDT-XMR",
  "CRIX.UPBIT.USDT-DASH",
  "CRIX.UPBIT.USDT-TRX",
  "CRIX.COINMARKETCAP.KRW-USDT",
];

export const COIN_CODES_KWR = [
  "CRIX.UPBIT.KRW-BTC",
  "CRIX.UPBIT.KRW-ETH",
  "CRIX.UPBIT.KRW-XRP",
  "CRIX.UPBIT.KRW-BCC",
  "CRIX.UPBIT.KRW-NEO",
  "CRIX.UPBIT.KRW-ADA",
  "CRIX.UPBIT.KRW-LTC",
  "CRIX.UPBIT.KRW-ETC",
  "CRIX.UPBIT.KRW-ZEC",
  "CRIX.UPBIT.KRW-OMG",
  "CRIX.UPBIT.KRW-BTG",
  "CRIX.UPBIT.KRW-SC",
  "CRIX.UPBIT.KRW-XMR",
  "CRIX.UPBIT.KRW-TRX",
  "CRIX.UPBIT.KRW-DASH",
  // "CRIX.UPBIT.KRW-SNT",
  // "CRIX.UPBIT.KRW-WAVES",
  // "CRIX.UPBIT.KRW-PIVX",
  // "CRIX.UPBIT.KRW-XEM",
  // "CRIX.UPBIT.KRW-QTUM",
  // "CRIX.UPBIT.KRW-LSK",
  // "CRIX.UPBIT.KRW-STEEM",
  // "CRIX.UPBIT.KRW-XLM",
  // "CRIX.UPBIT.KRW-ARDR",
  // "CRIX.UPBIT.KRW-KMD",
  // "CRIX.UPBIT.KRW-ARK",
  // "CRIX.UPBIT.KRW-STORJ",
  // "CRIX.UPBIT.KRW-GRS",
  // "CRIX.UPBIT.KRW-VTC",
  // "CRIX.UPBIT.KRW-REP",
  // "CRIX.UPBIT.KRW-EMC2",
  // "CRIX.UPBIT.KRW-SBD",
  // "CRIX.UPBIT.KRW-TIX",
  // "CRIX.UPBIT.KRW-POWR",
  // "CRIX.UPBIT.KRW-MER",
  // "CRIX.UPBIT.KRW-STRAT",
]

export const UPBIT_SEND_MESSAGE = [
  { "ticket": "ram macbook" },
  {
    "type": "recentCrix",
    "codes": [
      ...COIN_CODES_KWR,
      ...COIN_CODES_USDT,
    ]
  },
  {
    "type":"crixOrderbook",
    "codes": [
      ...COIN_CODES_KWR,
      ...COIN_CODES_USDT,
    ]
  }
];

// {"type": "crixTrade", "codes": ["CRIX.UPBIT.KRW-XRP"]}, {"type": "crixOrderbook", "codes": ["CRIX.UPBIT.KRW-XRP"]}
