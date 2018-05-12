<template>
  <div>
    <vue-headful
      :title="`${title}(${this.$store.state.usdKwrPrice}))`"
      description="Description from vue-headful"
    />
    <v-data-table
      v-bind:headers="headers"
      :items="this.$store.getters.viewOrderBookCoins"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.name}}</td>
        <td class="text-xs-center">{{ props.item.usdtSellPrice | currency}}</td>
        <td class="text-xs-center">{{ props.item.usdtSellSize}}</td>
        <td class="text-xs-center">{{ props.item.usdtSellVolume | currency}}</td>
        <td class="text-xs-center">{{ props.item.kwrBuyPrice | currency}}</td>
        <td class="text-xs-center">{{ props.item.kwrBuySize}}</td>
        <td class="text-xs-center">{{ props.item.kwrBuyVolume | currency}}</td>
        <td class="text-xs-center">{{ props.item.sellKimp}}</td>

      </template>
    </v-data-table>
  </div>
</template>

<script>
  import socketApi from '../api/socketApi';
  import { mapState } from "vuex";

  export default {
    name: 'Buy',
    data() {
      return {
        headers: [
          { text: '코인명', value: 'name', align: 'center', },
          { text: 'USDT SELL', value: 'usdtSellPrice', align: 'center', },
          { text: 'SIZE(KWR)', value: 'usdtSellSize', align: 'center', },
          { text: 'VOLUME(KWR)', value: 'usdtSellVolume', align: 'center', },
          { text: 'KWR BUY', value: 'kwrBuyPrice', align: 'center', },
          { text: 'SIZE(KWR)', value: 'kwrBuySize', align: 'center', },
          { text: 'VOLUME(KWR)', value: 'kwrBuyVolume', align: 'center', },
          { text: 'SELL KIMP', value: 'sellKimp', align: 'center', },
        ],
      };
    },
    computed: {
      title() {

        return this.$store.getters.viewOrderBookCoins.reduce( function (previous, {sellKimp}) {
          return previous > sellKimp ? previous : sellKimp;
        }, 0);
      },
      ...mapState(['count']),
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
