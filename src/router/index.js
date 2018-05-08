import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Buy from '@/components/Buy';
import Sell from '@/components/Sell';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/buy',
      name: 'Buy',
      component: Buy,
    },
    {
      path: '/sell',
      name: 'Sell',
      component: Sell,
    },
  ],
});
