import fetch from "../config/fetch";

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