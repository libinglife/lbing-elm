<template>
   <div>
       你好
   </div>
</template>
<script>

import { cityGuess } from "../../service/getData";
import { log } from 'util';

export default {
    name:'home',
    data(){
        return {
            guessCity:'',//当前城市
            guessCityid :'' ,//当前城市id
            hotcity:[], //热门城市列表
            groupcity:{} ,// 所有城市列表
        }
    },
    mounted (){
        //获取当前城市
        cityGuess().then(res=>{
            console.log(res)
            // this.guessCity =  res.name;
        })
    }
}
</script>

<style lang="scss" scoped>

</style>

