<template>
    <div>

        <!-- 
            -- type 动态化
            -- v-model 不是谁动能用的，自定义组件实现v-model,做以下两点：
                -- 1. 实现value值的绑定
                -- 2. 实现input事件
                ··！ v-model 是 :value="value" @input="onInput" 的语法糖原因

         -->
        <input :type="type" :value="value" @input="onInput" 
            @change="onChange"
            @blur="onBlur"
        >
        <!-- 等价 -->
        <!-- <input :type="type" :value="value" @input="$emit('input', e.target.value)" > -->
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'text'
            },
            value: {
                type: String,
                default: ''
            }
        },
        methods: {
            onInput(e) {
                //通知老爹发生了input事件，传给老爹新值
                this.$emit('input', e.target.value)
                
                /**
                 * *this:当前RsInput组件实例
                 * @ e 形参 即：$enent
                 * !单向数据流
                 */

                //通知FormItem校验
                this.$parent.$emit('validate','input');
            },
            onChange(e){
                this.$emit('on-change', e.target.value);
            },
            onBlur(e){
                this.$parent.$emit('validate','blur');
                this.$emit('on-blur', e.target.value)
            }
        },
    }
</script>

<style lang="stylus" scoped>

</style>