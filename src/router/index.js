import Vue from 'vue'
import Router from 'vue-router'

// import Home from '@/page/home/home';
// import City from '@/page/city/city';


Vue.use(Router);

const home = resolve => require.ensure([], () => resolve(require('@/page/home/home')), 'home');
const city = resolve => require.ensure([], () => resolve(require('@/page/city/city')), 'city');
const msite = resolve => require.ensure([], () => resolve(require('@/page/msite/msite')), 'msite')
const login = resolve => require.ensure([], () => resolve(require('@/page/login/login')), 'login');
const profile = resolve => require.ensure([], () => resolve(require('@/page/profile/profile')), 'profile');
const info = resolve => require.ensure([], () => resolve(require('@/page/profile/children/info')), 'info');
const order = resolve => require.ensure([],( )=> resolve(require('@/page/order/order')),'order');
const search = resolve => require.ensure([],( )=> resolve(require('@/page/search/search')),'search');
const food = resolve => require.ensure([],( )=> resolve(require('@/page/food/food')),'food');

export default new Router({
    routes: [{
        path: '',
        redirect: '/home'
    }, {
        path: '/',
        redirect: '/home'
    }, {
        path: '/home',
        name: 'home',
        component: home
    }, {
        path: '/city/:cityid',
        name: 'city',
        component: city
    }, {
        path: '/msite',
        name: 'msite',
        component: msite
            // meta: { keepAlive: true }
    }, {
        path: '/login',
        name: login,
        component: login
    }, {
        path: '/profile',
        name: profile,
        component: profile,
        children: [{
            path: 'info',
            component: info,
        }]
    },{
        path:'/order',
        name:order,
        component:order
    },{
        path:'/search/:geohash',
        name:search,
        component:search
    },{
        path:'/food',
        name:food,
        component:food
    }]
})