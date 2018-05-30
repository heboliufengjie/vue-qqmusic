import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import { Indicator } from 'mint-ui'
//import { mapState, mapGetters } from 'vuex';


Vue.use(Router)

const router = new Router({
    linkActiveClass: '',
    mode: 'history',
    routes: [{
            path: '/login',
            name: 'login',
            component(resolve) {
                require(['@/components/_login'], resolve);
            }
        },
        {
            path: '/register',
            name: 'register',
            component(resolve) {
                require(['@/components/_register'], resolve);
            },
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
        },
        {
            path: '/password_find',
            name: 'password_find',
            component(resolve) {
                require(['@/components/_password_find'], resolve);
            },
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
        },
        //getSystemRecommendUser
        // {
        //     path: '/systemRecommendUser/:id',
        //     name: 'systemRecommendUser',
        //     component(resolve) {
        //         require(['@/components/_systemRecommendUser'], resolve);
        //     }
        // },
        {
            path: '/me',
            name: 'me',
            component(resolve) {
                require(['@/components/_me'], resolve);
            },
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
        },
        {
            path: '/personal_display/:id',
            name: 'personal_display',
            component(resolve) {
                require(['@/components/_personal_display'], resolve);
            },
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
        },
        // {
        //     path: '/lables_edit/:id',
        //     name: 'lables_edit',
        //     component(resolve) {
        //         require(['@/components/_lables_edit'], resolve);
        //     }
        // },
        {
            path: '/lists',
            name: 'lists',
            component(resolve) {
                require(['@/components/_lists'], resolve);
            },
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
        },
        {
            path: '/item_add',
            name: 'item_add',
            component(resolve) {
                require(['@/components/_item_add'], resolve);
            },
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
        },
        {
            path: '/item_detail/:id',
            name: 'item_detail',
            component(resolve) {
                require(['@/components/_item_detail'], resolve);
            },
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
        },
        {
            path: '/item_edit/:id',
            name: 'item_edit',
            component(resolve) {
                require(['@/components/_item_edit'], resolve);
            },
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
        },
        {
            path: '*',
            name: '*',
            component(resolve) {
                require(['@/components/_lists'], resolve);
            },
            meta: {
                requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            },
        },
    ]
});

router.beforeEach((to, from, next) => {
    // Indicator.open('加载中...');
    let info = store.state.localStorage.info;
    if (to.meta.requireAuth) {
        // 
        //setTimeout(() => {
        //  console.log('1111>>>', info, (info && info.email))
        //}, 0);

        if (info && info.email) {
            next();
        } else {
            next('/login')
        }
    } else {
        // console.log('1111>>>', info, (info && info.email))
        // console.log('>>', to)
        if ((info && info.email) && to.name == 'login') {
            next('/lists')
        } else {
            next()
        }
    }
});

// router.afterEach((to) => {
//   store.commit('blurredPage/switchBlurredPage', to.name);
// })


export default router;
