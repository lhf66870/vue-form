<template>
    <div>
        <h2>用户登陆</h2>
        <button @click="onLogin" :disabled="loading">{{loading?'loading':'登陆'}}</button>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'//映射
    export default {
        data() {
            return {
                loading: false
            }
        },
        methods: {
            ...mapActions(['login']),
            onLogin() {
                
                //window.localStorage.setItem('isLogin',true)

                // 提交 mutations
                // this.$store.commit('login')

                //提交 actions
                this.loading = true
                // this.$store.dispatch('login').then(isLogin => {
                this.login({username:'Rversion'}).then(isLogin => {  
                    this.loading = false
                     const redirect = this.$route.query.redirect || '/'
                    // 路由重定向
                    this.$router.push(redirect)
                })
               
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>