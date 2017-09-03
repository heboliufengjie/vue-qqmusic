import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import { Indicator } from 'mint-ui'

Vue.use(Router)

const router = new Router({
  linkActiveClass: '',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component(resolve) {
        require(['@/components/_login'], resolve);
      }
    },
    {
      path: '/register',
      name: 'register',
      component(resolve) {
        require(['@/components/_register'], resolve);
      }
    },
    {
      path: '/lists/:id',
      name: 'lists',
      component(resolve) {
        require(['@/components/_lists'], resolve);
      }
    },
  ]
});

// router.beforeEach((to, from, next) => {
//   // Indicator.open('加载中...');
//   console.log(11)
//   next();
// });

// router.afterEach((to) => {
//   store.commit('blurredPage/switchBlurredPage', to.name);
// })


export default router;