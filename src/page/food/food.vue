<template>
    <div class="foot_container">
        <head-top :head-title="headTitle" go-back="true"></head-top>

    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    export default {
        name: "food",
        data(){
            return{
                headTitle:"",//msiet页面标题
            }
        },
        components:{
           headTop
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>