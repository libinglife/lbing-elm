<template>
    <div class="city_container">
        <head-top :head-title="cityname" go-back='true'>
            <router-link to="/home" slot="changecity" class="change_city">切换城市</router-link>
        </head-top>
        <form class="city_form">
            <div>
                <input type="search" name="city" placeholder="输入学校、商务楼、地址" class="city_input input_style" required v-model='inputVaule'>
            </div>
             <div>
                <input type="button" name="submit" class="city_submit input_style" @click='postpois' value="提交">
            </div>
        </form>
        <header v-if="historytitle" class="pois_search_history">搜索历史</header>
         <ul class="getpois_ul">
            <li v-for="(item, index) in placelist" :key="index" @click="nextpage(index ,item.geohash)">
                <h4 class="pois_name ellipsis">{{item.name}}</h4>
                <p class="pois_address ellipsis">{{item.address}}</p>
            </li>
        </ul> 
        <footer v-if="placelist.length&&historytitle" class="clear_all_history" @click="clearAll">清空所有</footer>
          <div class="search_none_place" v-if="placeNone">很抱歉！无搜索结果</div>
    </div>
</template>
<script>
    import headTop from '../../components/header/head'
    import {currentcity ,searchplace} from '../../service/getData'
    import {setStorage, getStorage, removeStorage} from '@/config/utils'
import { log } from 'util';
import { throws } from 'assert';

    export default {
        name: "city",
        data() {
            return {
               cityid:'', //城市id
               cityname:'',
               inputVaule:'',//搜索内容
               placelist:[],//搜素城市列表
               placeNone:false,//搜索无结果显示提示信息
               placeHistory:[],// 历史搜索记录
               historytitle:true,//默认显示搜索历史头部，点击搜索后隐藏

            };
        },
        components:{
            headTop
        },
        mounted (){
            this.cityid = this.$route.params.cityid;
            currentcity(this.cityid).then(res=>{
                this.cityname = res.name;
            });

            this.initData()
        },
        methods:{
            initData(){
              
                if(getStorage('placeHistory')){
                    console.log(getStorage('placeHistory'));
                    this.placelist = JSON.parse(getStorage('placeHistory'));
                }else{
                    this.placelist = [];
                    this.historytitle = false;
                }
            },
            //发送搜索信息
           async postpois(){
                if(this.inputVaule){
                  var result = await searchplace(this.cityid ,this.inputVaule);
                
                  this.placelist = result;
                  this.historytitle = false;
                  this.placeNone = result.length>0 ? false : true;
                }
            },
             /**
             * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
             * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
             */
            nextpage(index,geohash){
               let history = getStorage('placeHistory');
               
               let choosePlace = this.placelist[index];
               if(history){
                   console.log("进入");
                   let checkrepeat = false ;
                   this.placeHistory = JSON.parse(history);

                   this.placeHistory.forEach(item=>{
                       if(item.geohash==geohash){
                           checkrepeat = true
                       }
                   });
                   if(!checkrepeat){
                       this.placeHistory.push(choosePlace);
                   }
                       
               }else{
                   this.placeHistory.push(choosePlace);
               }
               setStorage('placeHistory',this.placeHistory);
               this.$router.push({path:'/msite',query:{geohash}});
            },
            clearAll(){
               removeStorage('placeHistory');
               this.initData();
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .city_container{
        padding-top: 2.35rem;
    }
    .change_city{
        right: 0.4rem;
        @include sc(0.6rem, #fff);
        @include ct;
    }
    .city_form{
        background-color: #fff;
        border-top: 1px solid $bc;
        border-bottom: 1px solid $bc;
        padding-top: 0.4rem;
        div{
            width: 90%;
            margin: 0 auto;
            text-align: center;
            .input_style{
                border-radius: 0.1rem;
                margin-bottom: 0.4rem;
                @include wh(100%, 1.4rem);
            }
            .city_input{
                border: 1px solid $bc;
                padding: 0 0.3rem;
                @include sc(0.65rem, #333);
            }
            .city_submit{
                background-color: $blue;
                @include sc(0.65rem, #fff);
            }
        }
    }
    .pois_search_history{
        border-top: 1px solid $bc;
        border-bottom: 1px solid $bc;
        padding-left: 0.5rem;
        @include font(0.475rem, 0.8rem);
    }
    .getpois_ul{
        background-color: #fff;
        border-top: 1px solid $bc;
        li{
            margin: 0 auto;
            padding-top: 0.65rem;
            border-bottom: 1px solid $bc;
            .pois_name{
                margin: 0 auto 0.35rem;
                width: 90%;
               @include sc(0.65rem, #333);
            }
            .pois_address{
                width: 90%;
                margin: 0 auto 0.55rem;
                @include sc(0.45rem, #999);
            }
        }
    }
    .search_none_place{
        margin: 0 auto;
        @include font(0.65rem, 1.75rem);
        color: #333;
        background-color: #fff;
        text-indent: 0.5rem;
    }
    .clear_all_history{
        @include sc(0.7rem, #666);
        text-align: center;
        line-height: 2rem;
        background-color: #fff;
    }
</style>

