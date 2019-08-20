<template>
  <div class="shopList_container">
    <ul v-if="shopListArr.length" type="1">
      <router-link class="shop_li" v-for="item in shopListArr" tag="li" :key="item.id">
         <section>
           <img :src="imgBaseUrl+item.image_path" class="shop_img" alt="">
         </section>
      </router-link>

    </ul>
  </div>

</template>

<script>
    import {shopList} from 'src/service/getData'
    import {imgBaseUrl} from 'src/config/env';
    import {mapState} from 'vuex'
    export default {
      name: "shoplist",
      data(){
        return{
          offset:0,//批次加载店铺列表，每次加载20个 limit = 20
          shopListArr:[] , //店铺列表数据
          imgBaseUrl
        }
      },
      mounted(){
        this.initData();

      },
      props:['restaurantCategoryId'],
      computed:{
        ...mapState({
          'latitude':'latitude',
          'longitude':'longitude'
        })
      },
      methods:{
        async initData(){
          //获取数据
          console.log(shopList)
          let res = await shopList(this.latitude,this.longitude,this.offset,this.restaurantCategoryId);
          console.log('执行',res);
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .shoplist_container{
    background-color: #ffffff;
    margin-bottom: 2rem;
  }
  .shop_li{
    display: flex;
    border-bottom:0.025rem solid #f1f1f1;
    padding: 0.7rem 0.4rem;
  }
  .shop_img{
    @include wh(2.7rem ,2.7rem);
    display: block;
    margin-right: 0.4rem;
  }
  .list_back_li{

  }


</style>
