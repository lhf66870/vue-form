<template>
    <div>
        <!-- 循环 -->
		<ul>
			<li v-for="good in goods" :key="good.id">
                <router-link :to="`details/${good.id}`">
                    <span>{{good.text}}</span>
                    <span>￥{{good.price}}</span>
                    <!-- 取消默认行为和冒泡 -->
                    <button @click.prevent.stop="onAddCart(good)">添加购物车</button>
                </router-link>
			</li>
		</ul>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
    export default {
        data() {
            return {
                goods:[
                    {
                        id:1,
                        text:'Rversion的布加迪威龙',
                        price:999999999999
                    },
                    {
                        id:2,
                        text:'Rversion的凌府庄园',
                        price:88888888888888888
                    }
                ],
            }
        },
        methods: {
            ...mapMutations(['addCart']),
            onAddCart(good) {
                this.addCart(good)
                this.$router.push('/cart')
            }
        },
    }

</script>

<style lang="stlyus" scoped></style>