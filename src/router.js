import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue';
import List from './views/List.vue';
import Details from './views/Details.vue';
import Cart from './components/Cart.vue';
import store from './store';

Vue.use(Router);


const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			// name: 'home',
			component: Home,
			children:[
				{
					path:'',//默认展示
					name:'list',
					component: List
				},
				{
					path:'/Details/:id',
					name:'details',
					component:Details,
					props:true,
					meta: {
						title: '我的',
						keepAlive: true, // 需要被缓存
						needLogin: true // 需要登录
					}
				}
			]
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/cart',
			name: 'cart',
			component: Cart
		},
		{
			path: '/about',
			name: 'about',
			beforeEnter(to,from,next){
				let isLogin = localStorage.getItem('isLogin')
				if (!isLogin) {
				　　// 登录后，跳到到当前页面
					router.push({
						name: 'login',
						query: {redirect: to.fullPath}  
					})
				}
				next()
			},
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
		}
	]
})


// 每次路由激活之前都会执行回调函数
router.beforeEach((to, from, next) => {
	// console.log(to,from,next)
	const nextRoute = ['details'] // 需要登录的页面
	// let isLogin = localStorage.getItem('isLogin')  // 判断是否登录，本地存储有用户数据则视为已经登录
	let isLogin = store.state.isLogin
	// 未登录状态；当路由到 nextRoute 指定页时，跳转至 login
	if (nextRoute.indexOf(to.name) >= 0) { // 检测是否登录的页面

		// 如果未登录（本地存储无用户数据），并且要跳到登录页面
		if (!isLogin) {
			 
			if (from.name === 'login') {
				next('/')
				return
			}
		　　// 登录后，跳到到当前页面
			next({
				name: 'login',
				query: {redirect: to.fullPath}  
			})
		}
	}
	// 已登录状态；当路由到 UserLogIn 时，跳转至 Home
	if (to.name === 'login') {
		if (isLogin) {
			next('/')
			return
		}
	}
	next() // 必须使用 next ,执行效果依赖 next 方法的调用参数

	/**
	 * ! meta 路由元信息 
	 * ?一个路由匹配到的所有路由记录
	 * ?会暴露为 $route 对象 (还有在
	 * ?导航守卫中的路由对象) 的 
	 * ?$route.matched 数组。因此，
	 * ?我们需要遍历 $route.matched 
	 * ?来检查路由记录中的 meta 字段。
	 */

	// if (to.meta.needLogin) {  // 判断该路由是否需要登录权限
	// 	if (isLogin) { // 判断是否已经登录
	// 	  	next()
	// 	}else {
	// 	  	next({
	// 			path: '/login',
	// 			query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
	// 	  	})
	// 	}
	// }else {
	// 	next()
	// }
})

export default router
