import * as types from "./types";
import { convertCoinToViewModel } from "../models/coin";

export default {
  updateCoin ({commit}, coin) {
    commit(types.UPDATE_COIN, convertCoinToViewModel(coin));
  },
  setUsdKwrPrice({commit}, tradePrice) {
    commit(types.SET_UDS_KWR_PRICE, tradePrice);
  }
};
