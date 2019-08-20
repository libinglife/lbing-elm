import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';


Vue.use(Vuex);

// 定义一些状态
const state = {
    login: true, //登录
    userInfo: null , //用户信息
    geohash: '31.22299,121.36025',//地址geohash值
    latitude:'',//当前位置纬度
    longitude: '', // 当前位置经度
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
})
