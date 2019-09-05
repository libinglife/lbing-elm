import { RECORD_USERINFO, GET_USERINFO, OUT_LOGIN ,SAVE_GEOHASH ,RECORD_ADDRESS } from './mutation-types';

import { setStorage, getStorage } from "../config/utils";
export default {
    [RECORD_USERINFO](state, info) {
        console.log(info);

        state.userInfo = info;
        state.login = true;

        setStorage('user_id', info.user_id);
    },
    [GET_USERINFO](state, info) {
        console.log(info);

        console.log(state);
        if (state.userInfo && (state.userInfo.username !== info.username)) {
            return
        }

        if (!state.login) {
            console.log("已经登录了");
            return
        }
        if (!info.message) {
            state.userInfo = {...info};
        } else {
            state.userInfo = null;
        }
    },
    [OUT_LOGIN](state) {
        state.userInfo = {};
        state.login = false;
    },
    [SAVE_GEOHASH](state,geohash){
        console.log('传递过来的信息',geohash);
        state.geohash = geohash
    },
    [RECORD_ADDRESS](state,{latitude,longitude}){
        state.latitude = latitude;
        state.longitude = longitude;
    }
}