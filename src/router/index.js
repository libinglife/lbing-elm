import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home/home';
import City from '@/page/city/city';
// import City from '@/page/city/city'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '',
        redirect: '/home'
    }, {
        path: '/home',
        name: 'home',
        component: Home
    }, {
        path: '/city/:cityid',
        component: City
    }]
})