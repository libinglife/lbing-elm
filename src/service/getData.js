import fetch from "../config/fetch";

// 获取首页默认地址

export const cityGuess = () => fetch('/api/v1/cities', {
    type: 'guess'
})