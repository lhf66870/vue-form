<template>
    <div>
        <caption>{{title}}</caption>
        <table border="1">
            <thead>
                <tr>
                    <th></th>
                    <th>商品名</th>
                    <th>单价</th>
                    <th>数量</th>
                    <th>总价</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="c in cart" :key="c.id" :class="{inactive: !c.active}">
                    <td><input type="checkbox" v-model="c.active"></td>
                    <td>{{c.text}}</td>
                    <td>￥{{c.price}}</td>
                    <td>{{c.count}}</td>
                    <td>￥{{c.price * c.count}}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4" align="right">总计：</td>
                    <td>￥{{total}}</td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script>
    import { mapState } from "vuex"
    export default {
        data() {
            return {
                // cart:JSON.parse(localStorage.getItem('cart')) || []
            }
        },
        props: {
            title: {
                type: String,
                default:'' 
            },
            func: {
                type: Function,
                default: function(){}
            }
        },
        computed: {
            total() {
                return this.cart.reduce((sum,c)=>{
                    if(c.active){
                        sum += c.count * c.price
                    }
                    return sum
                },0)
            },
            ...mapState({
                cart: state => state.cart.list
            })
        },
        watch: {
            cart: {
                deep: true,
                handler(newValue, oldValue) {
                    localStorage.setItem('cart', JSON.stringify(newValue))
                }
            }
        },
        mounted () {
            
        },
        methods: {
            
        }
    }
</script>

<style lang="stylus" scoped>
.inactive 
    background : #ccc;
    color: red;
</style>