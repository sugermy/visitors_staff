import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    suitelist: [],
    bookForm: {}
  },
  mutations: {
    chooseSuite (state, data) {
      state.suitelist = data
    },
    saveBook (state, data) {
      state.bookForm = data
    },
  },
  actions: {
    //设置随访人员
    commitSuite ({ commit }, data) {
      commit('chooseSuite', data);
    },
    //保存基础信息
    commitBook ({ commit }, data) {
      commit('saveBook', data);
    },
  }
})
