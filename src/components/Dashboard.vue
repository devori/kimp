<template>
  <div>
    <vue-headful
      :title="title"
      description="Description from vue-headful"
    />
    <h3>기준 환율 : {{baseExchangeRatio | currency}}</h3>
    <v-card>
      <v-card-title>KRW to USDT = {{toUsdtPremium}}%</v-card-title>
      <v-card-text class="elevation-3">
        <v-data-table
          :headers="toUsdtHeaders"
          :items="toUsdtInfoList"
          :pagination.sync="pagination"
          hide-actions
          class="elevation-1"
          style="overflow-y: scroll; height: 300px"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.name}}</td>
            <td class="text-xs-right">{{ (props.item.ratio.toFixed(5) )}}</td>
            <td class="text-xs-right">{{ props.item.size.toFixed(5) }}</td>
            <td class="text-xs-right">{{ props.item.kwrSellPrice | currency }}</td>
            <td class="text-xs-right">{{ props.item.usdtBuyPrice | currency('$') }}</td>
            <td class="text-xs-right">{{ props.item.fromKrw | currency }}</td>
            <td class="text-xs-right">{{ props.item.toKrw | currency }}</td>
            <td class="text-xs-right">{{ props.item.toUsdt | currency('$') }}</td>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>USDT to KRW = {{toKrwPremium}}%</v-card-title>
      <v-card-text class="elevation-3">
        <v-data-table
          :headers="toKrwHeaders"
          :items="toKrwInfoList"
          :pagination.sync="pagination"
          hide-actions
          class="elevation-1"
          style="overflow-y: scroll; height: 300px"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.name}}</td>
            <td class="text-xs-right">{{ (props.item.ratio.toFixed(5) )}}</td>
            <td class="text-xs-right">{{ props.item.size.toFixed(5) }}</td>
            <td class="text-xs-right">{{ props.item.usdtSellPrice | currency('$') }}</td>
            <td class="text-xs-right">{{ props.item.kwrBuyPrice | currency }}</td>
            <td class="text-xs-right">{{ props.item.fromUsdt | currency('$') }}</td>
            <td class="text-xs-right">{{ props.item.fromKrw | currency }}</td>
            <td class="text-xs-right">{{ props.item.toKrw | currency }}</td>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import socketApi from '../api/socketApi';

  export default {
    name: 'Dashboard',
    data() {
      return {
        toUsdtHeaders: [
          { text: '코인명', value: 'name', align: 'center' },
          { text: 'Ratio', value: 'ratio', align: 'center' },
          { text: 'SIZE(unit)', value: 'size', align: 'center' },
          { text: 'Price(KRW)', value: 'kwrSellPrice', align: 'center' },
          { text: 'Price(USDT)', value: 'usdtBuyPrice', align: 'center' },
          { text: 'From(KRW)', value: 'fromKrw', align: 'center' },
          { text: 'To(KRW)', value: 'toKrw', align: 'center' },
          { text: 'To(USDT)', value: 'toUsdt', align: 'center' },
        ],
        toKrwHeaders: [
          { text: '코인명', value: 'name', align: 'center' },
          { text: 'Ratio', value: 'ratio', align: 'center' },
          { text: 'SIZE(unit)', value: 'size', align: 'center' },
          { text: 'Price(UDST)', value: 'usdtSellPrice', align: 'center' },
          { text: 'Price(KRW)', value: 'kwrBuyPrice', align: 'center' },
          { text: 'From(USDT)', value: 'fromUsdt', align: 'center' },
          { text: 'From(KRW)', value: 'fromKrw', align: 'center' },
          { text: 'To(KRW)', value: 'toKrw', align: 'center' },
        ],
        pagination: {
          sortBy: 'ratio',
          rowsPerPage: 30,
          descending: true,
        },
      };
    },
    computed: {
      title() {
        return this.usdKrwPrice;
      },
      baseExchangeRatio() {
        return 1070;
      },
      usdKrwPrice() {
        return this.$store.state.usdKwrPrice;
      },
      toUsdtInfoList() {
        const list = this.$store.getters.viewOrderBookCoins;
        return list.map(({ name, usdtBuySize, kwrSellSize, buyKimp, usdtBuyPrice, kwrSellPrice }) => {
          const size = Math.min(usdtBuySize, kwrSellSize);
          const fromKrw = size * kwrSellPrice;
          const toKrw = size * usdtBuyPrice;
          const toUsdt = toKrw / this.usdKrwPrice;
          const ratio = toUsdt / (fromKrw / this.baseExchangeRatio);
          return {
            name,
            buyKimp,
            size,
            kwrSellPrice,
            usdtBuyPrice: usdtBuyPrice / this.usdKrwPrice,
            fromKrw,
            toKrw,
            toUsdt,
            ratio,
          };
        });
      },
      toKrwInfoList() {
        const list = this.$store.getters.viewOrderBookCoins;
        return list.map(({ name, usdtSellSize, kwrBuySize, sellKimp, usdtSellPrice, kwrBuyPrice }) => {
          const size = Math.min(usdtSellSize, kwrBuySize);
          const fromKrw = size * usdtSellPrice;
          const fromUsdt = fromKrw / this.usdKrwPrice;
          const toKrw = size * kwrBuyPrice;
          const ratio = toKrw / (fromUsdt * this.baseExchangeRatio);
          return {
            name,
            sellKimp,
            size,
            kwrBuyPrice,
            usdtSellPrice: usdtSellPrice / this.usdKrwPrice,
            fromKrw,
            fromUsdt,
            toKrw,
            ratio,
          };
        });
      },
      toUsdtPremium() {
        const maxRatio = this.getMaxRatio(this.toUsdtInfoList);
        return ((1 - maxRatio) * 100).toFixed(5);
      },
      toKrwPremium() {
        const maxRatio = this.getMaxRatio(this.toKrwInfoList);
        return ((maxRatio - 1) * 100).toFixed(5);
      },
    },
    methods: {
      getMaxRatio(list) {
        return list.map(({ ratio }) => ratio)
          .reduce((max, ratio) => (max > ratio ? max : ratio), 0);

      },
    },
    mounted() {
      socketApi.open('wss://crix-websocket.upbit.com/sockjs/449/wsryiuvw/websocket', this.$store);
    },
    beforeDestroy() {
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
