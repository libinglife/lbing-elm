<template>
    <div>
        <div>搜索页面</div>
        <foodGuide></foodGuide>
    </div>
</template>

<script>
    import foodGuide from 'src/components/footer/footGuide'
    export default {
        name: "search",
        components:{
            foodGuide
        },
        data(){
            return{

            }
        },
    }
</script>

<style scoped>

</style>