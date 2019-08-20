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

//城市页 获取搜索地址
export const searchplace = (cityid, value) => fetch('/api/v1/pois', {
    type: 'search',
    city_id: cityid,
    keyword: value
})


// 登录页获取图片验证码
export const getcaptchas = () => fetch('/api/v1/captchas', {}, "post");

// 密码登录注册
export const accountLogin = (username, password, captcha_code) => fetch('/api/v2/login', { username, password, captcha_code }, 'post');

// 获取用户信息
export const getUser = () => fetch('/api/v1/user', { user_id: getStorage("user_id") });

// 个人中心更换头像
export const changeAvatar = (userid, files) => fetch('/api/eus/v1/users/' + userid + '/avatar', { files }, 'post');

//退出登录
export const signout = () => fetch('/api/v2/signout');

// 商品页 msite 食品分类列表

export const msiteFoodTypes = (geohash) => fetch("/api/v2/index_entry", {
    geohash,
    group_type: '1',
    "flags[]": "F"
});
//获取msite商铺列表
export const shopList = (latitude , longitude ,offset ,restaurant_category_id = '' ,restaurant_category_ids = '',order_by="",delivery_mode = '' ,supports_ids = [])=>{
  let supportStr = '' ;
  supports_ids.forEach((item,index)=>{
    if(item.status){
      supportStr+='&support_ids[]='+item.id;
    }
    let data ={
      latitude,
      longitude,
      offset,
      limit:'20',
      'extras[]':'activities',
      keyword:'',
      restaurant_category_id,
      'restaurant_category_ids[]':restaurant_category_ids,
      order_by,
      'delivery_mode[]':delivery_mode+supportStr
    };
    return fetch('/shopping/restaurants',data)
  })

}
