import Vue from 'vue'
import Vuex from 'vuex'
import getters from "@/store/getters";
import state from "@/store/state";
import user from "@/store/modules/user";
Vue.use(Vuex)
export default new Vuex.Store({
  modules:{
    user
  },
  state,
  mutations: {

  },
  actions: {

  },
  getters
})