<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        // provide 返回对象可以跨层级传参给子孙
        // 参照 react 上下文
        provide(){
            return {
                form: this //表单实例传递给后代
            }
        },
        props: {
            model: {
                type: Object,
                required: true 
            },
            rules: {
                type: Object
            }
        },
        mounted () {
            console.log(this)
        },
        methods: {
            // 执行表单中所有表单校验
            async validate(cb) {
                // Promise返回的 true/false 数组
                const tasks = this.$children.filter(item => item.prop)
                                            .map(item => item.validate())
                // tasks中任意false就校验失败
                const results = await Promise.all(tasks);
                // 但凡一个为false就校验失败
                if(results.some(valid => !valid)){
                    // 校验失败
                    cb(false)
                }else{
                    cb(true)
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>