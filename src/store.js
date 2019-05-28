import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const cart = {
  state: {
    list: []
  },
  mutations: {
    addCart(state, good) {
      const ret = state.list.find(v => v.id === good.id)
      if (ret) {
        ret.count += 1;
      } else {
        state.list.push({ ...good, count: 1, active: true });
      }
    }
  }
}

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  getters: {
    loginState(state){
      return state.isLogin ? "欢迎回来" : "游客";
    }
  },
  mutations: {
    login(state){
      state.isLogin = true;
    }
  },
  // 复杂逻辑场景绝对存在
  actions: {
    login(context, payload) {
      // login({commit}, payload) {
      console.log("====================================");
      console.log(context);
      console.log(payload);
      console.log("====================================");

      // setInterval(()=>{
      //   context.commit(login)
      // },1000)

      return new Promise(resolve => {
        setInterval(() => {
          context.commit("login");
          resolve(true);
        }, 1000);
      });
    }
  },
  modules: {
    cart
  }
});
