<template>
	<div class="hello">
		<!-- 条件 -->
		<p :title="title" v-if="title">{{title}}</p>

		<!-- 用户输入 -->
		<div>
			<input type="text" v-model="text">
			<button @click="addGood">添加商品</button>
		</div>

		<!-- 循环 -->
		<ul>
			<li v-for="good in goods" :key="good.id">
				<span>{{good.text}}</span>
				<span>￥{{good.price}}</span>
				<button @click="addCart(good)">添加购物车</button>
			</li>
		</ul>


		<!-- 购物车 -->
		<!-- {{cart}} -->
		<Cart title="title" :func="propFunc" ref="Cart" @onSuccess="onAddCart"></Cart>
	</div>
</template>

<script>
import Cart from './Cart'
export default{
	name: 'HelloWorld',
	components: {
		Cart,
	},
	data() {
		return {
			title: '',
			text:'',
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
	created () {
		setInterval(() => {
			this.title = 'Rversion的购物车'
		},1000);
	},
	methods: {
		/**
		 * methodName => $enent
		 * methodName(params) => params
		 * methodName($enent,params) => $enent,params
		 */
		addGood() {
			if(this.text){
				this.goods.push({
					id:this.goods.length+1,
					text:this.text,
					price:666666666666
				})
				this.text = ''
			}
		},
		// 添加购物车
		addCart(good){
			// 容易和购物车之间产生耦合关系
			// this.$refs.Cart.addCart(good)
			// $bus 派发事件
			this.$bus.$emit('addCart', good)
		},

		onAddCart(params){
			console.log('====================================');
			console.log(`老爹，我成功将${params}加入购物车了！！！`);
			console.log('====================================');
		},
		propFunc(){
			console.log('====================================');
			console.log('我是传递的函数！');
			console.log('====================================');
		}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>
