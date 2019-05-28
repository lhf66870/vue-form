<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login" v-if="!isLogin">Login</router-link>
      <span v-else>欢迎回来！</span>
      <span>{{loginState}}</span>
    </div>

    <div>
      RsStore:{{count}}
      <button @click="onAdd">自增</button>
    </div>
    <router-view/>
  </div>
</template>
<script>

import RsStore from './RsStore';
import {mapState,mapGetters} from 'vuex'//映射
export default {
    computed:{
      ...mapState(['isLogin']),
      ...mapGetters(['loginState']),
      count(){
        return RsStore.state.count
      }
    },
    methods: {
      onAdd() {
        RsStore.commit('add')
      }
    },

}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
