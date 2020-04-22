import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lineName:""
  },
  getters:{
    getLineName:state=>state.lineName
  },
  mutations: {
    setLineName(state,name) {
      state.lineName = name
    }
  },
  actions: {
  },
  modules: {
  }
})
