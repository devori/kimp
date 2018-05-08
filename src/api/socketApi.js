import Socket from 'simple-websocket';
import _ from 'lodash';
import * as types from '../store/types';
import {UPBIT_SEND_MESSAGE} from "../constants";
import {COIN_CODES_USDT} from "../constants/index";
import {COIN_CODES_KWR} from "../constants/index";
let socket;
let coinStore;

export default {
  createSocketAndConnectToServer(url, store) {
    coinStore = store;
    socket = new Socket(url);
  },
  destroySocket() {
    socket.destroy();
  },
  open(url, store) {
    this.createSocketAndConnectToServer(url, store);
    socket.on('connect', () => {
      console.log('socket is connected');
    });
    socket.on('disconnect', () => {
      console.log('socket is disconnected');
      this.destroySocket();
    });
    socket.on('error', () => {
      console.log('error is occurred');
      if (!socket.connected) {
        this.destroySocket();
        setTimeout(_.bind(this.open, this), 2000);
      }
    });
    socket.on('data', (uint8array) => {
      const data = uint8array.toString();

      if (data[0] === 'o') {
        const message = [JSON.stringify(UPBIT_SEND_MESSAGE)];
        socket.send(JSON.stringify(message));
      } else if (data[0] === 'a') {
        const coin = JSON.parse(JSON.parse(data.substr(1, data.length - 1))[0]);

        if(coin.type === 'recentCrix') {
          if (coin.code === COIN_CODES_USDT[COIN_CODES_USDT.length - 1]) {
            console.log(coin.tradePrice);
            coinStore.dispatch('setUsdKwrPrice', coin.tradePrice);
          } else if ([...COIN_CODES_USDT, ...COIN_CODES_KWR].indexOf(coin.code) > -1) {
            coinStore.dispatch('updateCoin', coin);
          }
        } else if(coin.type === 'crixOrderbook') {
          coinStore.dispatch('updateOrderBook', coin);
        }

      } else {
        console.log(data);
      }
    });
  },
};

