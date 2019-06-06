import fetch from "../config/fetch";
import { getStorage } from "../config/utils";
// 获取首页默认地址
export const cityGuess = () => fetch('/api/v1/cities', {
    type: 'guess'
})

//首页热门城市
export const hotcity = () => fetch('/api/v1/cities', {
    type: 'hot'
})


//获取首页所有城市
export const groupcity = () => fetch('/api/v1/cities', {
    type: 'group'
});


//根据id 搜素城市名
export const currentcity = (id_num) => fetch('/api/v1/cities/' + id_num);


// 登录页获取图片验证码
export const getcaptchas = () => fetch('/api/v1/captchas', {}, "post");

// 密码登录注册
export const accountLogin = (username, password, captcha_code) => fetch('/api/v2/login', { username, password, captcha_code }, 'post');

// 获取用户信息
export const getUser = () => fetch('./api/v1/user', { user_id: getStorage("user_id") })