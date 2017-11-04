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
      path: '/password_find',
      name: 'password_find',
      component(resolve) {
        require(['@/components/_password_find'], resolve);
      }
    },
    {
      path: '/me',
      name: 'me',
      component(resolve) {
        require(['@/components/_me'], resolve);
      }
    },
    {
      path: '/edit_lables',
      name: 'edit_lables',
      component(resolve) {
        require(['@/components/_edit_lables'], resolve);
      }
    },
    {
      path: '/lists/:id',
      name: 'lists',
      component(resolve) {
        require(['@/components/_lists'], resolve);
      }
    },
    {
      path: '/add_item',
      name: 'add_item',
      component(resolve) {
        require(['@/components/_add_item'], resolve);
      }
    },
    {
      path: '/edit_item/:id',
      name: 'edit_item',
      component(resolve) {
        require(['@/components/_edit_item'], resolve);
      }
    },
    {
      path: '/personal_display/:id',
      name: 'personal_display',
      component(resolve) {
        require(['@/components/_personal_display'], resolve);
      }
    },
    //personal_display.vue
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