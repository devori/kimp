<template>
  <div>
    <v-card>
      <v-card-text class="elevation-3">
        <vue-headful
          :title="title"
          description="Description from vue-headful"
        />
        <v-data-table
          v-bind:headers="headers"
          :items="buyingInfoList"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.name}}</td>
            <td class="text-xs-right">{{ (props.item.ratio.toFixed(5) )}}</td>
            <td class="text-xs-right">{{ props.item.size }}</td>
            <td class="text-xs-right">{{ props.item.fromKrw | currency }} W</td>
            <td class="text-xs-right">{{ props.item.toKrw | currency }} W</td>
            <td class="text-xs-right">{{ props.item.toUsdt | currency }} $</td>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import socketApi from '../api/socketApi';
  import {BASE_EXCHANGE_RATIO} from "../constants";

  export default {
    name: 'Dashboard',
    data() {
      return {
        headers: [
          { text: '코인명', value: 'name', align: 'center', },
          { text: 'Ratio', value: 'ratio', align: 'center', },
          { text: 'SIZE(unit)', value: 'size', align: 'center', },
          { text: 'From(KRW)', value: 'fromKrw', align: 'center', },
          { text: 'To(KRW)', value: 'toKrw', align: 'center', },
          { text: 'To(USDT)', value: 'toUsdt', align: 'center', },
        ],
      };
    },
    computed: {
      title() {
        const maxRatio = this.buyingInfoList
          .map(({ratio}) => ratio)
          .reduce((max, v) => max < v ? v : max, 0);

        return `${((1 - maxRatio) * 100).toFixed(2)}(${this.usdKrwPrice})`;
      },
      usdKrwPrice() {
        return this.$store.state.usdKwrPrice;
      },
      buyingInfoList() {
        const list = this.$store.getters.viewOrderBookCoins;
        return list.map(({name, usdtBuySize, kwrSellSize, buyKimp, usdtBuyPrice, kwrSellPrice}) => {
          const size = Math.min(usdtBuySize, kwrSellSize);
          const fromKrw = size * kwrSellPrice;
          const toKrw = size * usdtBuyPrice;
          const toUsdt = toKrw / this.usdKrwPrice;
          const ratio = toUsdt / (fromKrw / BASE_EXCHANGE_RATIO);
          return {
            name,
            buyKimp,
            size,
            kwrSellPrice,
            usdtBuyPrice,
            fromKrw,
            toKrw,
            toUsdt,
            ratio,
          };
        });
      },
    },
    mounted() {
      socketApi.open('wss://crix-websocket.upbit.com/sockjs/449/wsryiuvw/websocket', this.$store)
    },
    beforeDestroy () {
      socketApi.destroySocket();
    },
  };
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .header {
    padding: 10px 70px;
    height: 30px;
    display: flex;
    justify-content: space-between;
  }

  .drop {
    color: #0051c7;
  }

  .rise {
    color: #d60000;
  }

  .cad-price{
    border: 1px solid black;
  }
</style>
