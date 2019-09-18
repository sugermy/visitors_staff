import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    suitelist:[]
  },
  mutations: {
    chooseSuite(state,data){
      state.suitelist=data
    }
  },
  actions: {
 //设置随访人员
    commitSuite ({ commit }, data) {
      commit('chooseSuite', data);
    },
  }
})
