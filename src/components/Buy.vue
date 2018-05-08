<template>
  <div>
    <vue-headful
      :title="title"
      description="Description from vue-headful"
    />
    <div class="header">
    </div>
    <v-data-table
      v-bind:headers="headers"
      :items="this.$store.getters.viewOrderBookCoins"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.name}}</td>
        <td class="text-xs-center">{{ props.item.kwrSellPrice | currency}}</td>
        <td class="text-xs-center">{{ props.item.kwrSellSize}}</td>
        <td class="text-xs-center">{{ props.item.kwrSellVolume | currency}}</td>
        <td class="text-xs-center">{{ props.item.usdtBuyPrice | currency}}</td>
        <td class="text-xs-center">{{ props.item.usdtBuySize}}</td>
        <td class="text-xs-center">{{ props.item.usdtBuyVolume | currency}}</td>
        <td class="text-xs-center">{{ props.item.buyKimp}}</td>

      </template>
    </v-data-table>
  </div>
</template>

<script>
  import socketApi from '../api/socketApi';

  export default {
    name: 'Buy',
    data() {
      return {
        headers: [
          { text: '코인명', value: 'name', align: 'center', },
          { text: 'KWR SELL', value: 'kwrSellPrice', align: 'center', },
          { text: 'SIZE(KWR)', value: 'kwrSellSize', align: 'center', },
          { text: 'VOLUME(KWR)', value: 'kwrSellVolume', align: 'center', },
          { text: 'USDT BUY', value: 'usdtBuyPrice', align: 'center', },
          { text: 'SIZE(KWR)', value: 'usdtBuySize', align: 'center', },
          { text: 'VOLUME(KWR)', value: 'usdtBuyVolume', align: 'center', },
          { text: 'BUY KIMP', value: 'buyKimp', align: 'center', },
        ],
      };
    },
    computed: {
      title() {

        return this.$store.getters.viewOrderBookCoins.reduce( function (previous, {buyKimp}) {
          return previous < buyKimp ? previous : buyKimp;
        }, 100);
      }
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
