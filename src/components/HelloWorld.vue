<template>
  <div>

  <div class="header">
      <div>
        {{ averageRates() }}
      </div>
  </div>
  <v-data-table
    v-bind:headers="headers"
    :items="viewCoins"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">{{ props.item.name}}</td>
      <td class="text-xs-center">
        <div :class="[{rise: props.item.change === 'RISE', drop: props.item.change !== 'RISE'}]">
          {{ props.item.upbitPrice | currency }}
        </div>
      </td>
      <td class="text-xs-center">{{ props.item.usdKwrPrice | currency}}({{props.item.usdPrice | currency('$', ',', 2)}})</td>
      <td class="text-xs-center">
        <div :class="[{rise: props.item.change === 'RISE', drop: props.item.change !== 'RISE'}]">
          {{ props.item.signedChangeRate }}
        </div>
      </td>
      <td class="text-xs-center">{{ props.item.kimp }}</td>
    </template>
  </v-data-table>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import socketApi from '../api/socketApi';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        headers: [
          { text: '코인명', value: 'name', align: 'center', },
          { text: '업비트', value: 'upbitPrice', align: 'center', },
          { text: '외국 거래소', value: 'usdKwrPrice', align: 'center', },
          { text: '전일대비', value: 'signedChangeRate', align: 'center', },
          { text: '김프', value: 'kimp', align: 'center', },
        ],
      };
    },
    computed: {
      ...mapGetters([
        'viewCoins',
      ]),
    },
    methods: {
      averageRates() {
        return (this.viewCoins.reduce((acc, coin) => acc + parseFloat(coin.kimp), 0) / this.viewCoins.length).toString().substr(0,6);
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    flex-direction: row-reverse;
  }

  .drop {
    color: #0051c7;
  }

  .rise {
    color: #d60000;
  }
</style>
