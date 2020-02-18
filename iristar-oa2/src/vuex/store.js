import Vue from 'vue'
import Vuex from 'vuex'
// 状态
const state = {
  treeData: [],
  treeTitle: '',
  treeTitleId: '',
}
// 修改
const mutations = {
  changeTreeData(state, treeData) {
    state.treeData = treeData
  },
  changeTreeTitle(state, treeTitle) {
    state.treeTitle = treeTitle
  },
  changeTreeTitleId(state, treeTitleId) {
    state.treeTitleId = treeTitleId
  },
}
const getters = {}
// 触发
const actions = {
  setTreeData({commit}, treeData) {
    commit('changeTreeData', treeData)
  },
  setTreeTitle({commit}, treeTitle) {
    commit('changeTreeTitle', treeTitle)
  },
  setTreeTitleId({commit}, treeTitleId) {
    commit('changeTreeTitleId', treeTitleId)
  }
}

Vue.use(Vuex);
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})