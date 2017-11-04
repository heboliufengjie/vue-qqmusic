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
      path: '/personal_display',
      name: 'personal_display',
      component(resolve) {
        require(['@/components/_personal_display'], resolve);
      }
    },
    {
      path: '/lables_edit/:id',
      name: 'lables_edit',
      component(resolve) {
        require(['@/components/_lables_edit'], resolve);
      }
    },
    {
      path: '/lists',
      name: 'lists',
      component(resolve) {
        require(['@/components/_lists'], resolve);
      }
    },
    {
      path: '/item_add',
      name: 'item_add',
      component(resolve) {
        require(['@/components/_item_add'], resolve);
      }
    },
    {
      path: '/item_detail/:id',
      name: 'item_detail',
      component(resolve) {
        require(['@/components/_item_detail'], resolve);
      }
    },
    {
      path: '/item_edit/:id',
      name: 'item_edit',
      component(resolve) {
        require(['@/components/_item_edit'], resolve);
      }
    },
    // {
    //   path: '/personal_display/:id',
    //   name: 'personal_display',
    //   component(resolve) {
    //     require(['@/components/_personal_display'], resolve);
    //   }
    // },
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