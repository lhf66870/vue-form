<template>
    <div>
        <h3>商品详情</h3>
        <p>参数获取:{{$route.params.id}}</p>
        <p>props参数：{{id}}</p>
    </div>
</template>

<script>
    export default {
        props:['id']
    }
</script>

<style lang="scss" scoped>

</style>