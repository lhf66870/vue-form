<template>
    <div>
        <label v-if="label">{{label}}</label>
        <!-- 插槽 -->
        <slot></slot>
        <!-- 校验错误信息 -->
        <p v-if="errorMessage" class="error">{{errorMessage}}</p>
        <!-- <slot name="foo"></slot> -->
    </div>
</template>

<script>
    import Validator from 'async-validator'
    export default {
        // 注入实例
        inject:['form'],
        props: ['label','prop'],
        data() {
            return {
                errorMessage: ''
            }
        },
        created () {
            this.$on('validate', this.validate);
        },
        methods: {
            validate() {
                return new Promise(resolve => {
                    //执行校验?
                    console.log('开始执行校验')
                    // 校验规则指定
                    const descriptor = { [this.prop]:this.form.rules[this.prop] };
                    // console.log(descriptor)
                    // 创建校验器
                    const validator = new Validator(descriptor)
                    // 执行校验开始
                    const validateName =  { [this.prop] : this.form.model[this.prop] }//校验数据
                    validator.validate(
                        validateName,
                        errors => {
                            if(errors) {
                                //显示错误信息
                                this.errorMessage = errors[0].message
                                resolve(false)
                            }else{
                                this.errorMessage = '';
                                resolve(true)
                            }
                        }
                    )
                })
            }
        },
    }
</script>

<style lang="stylus" scoped>
    fontColor = red
    border-radius()
        -webkit-border-radius arguments
        -moz-border-radius arguments
        border-radius arguments

    sum(nums...)
        sum = 0
        sum += n for n in nums


    .error 
        background:yellow;
        color:fontColor;
        line-height :24px;
        border-radius 10px;
        padding:sum(1,2,3,4)px;
        
</style>