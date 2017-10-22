import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

var totalHeight = document.documentElement.clientHeight
var headerHeight = 60
const state = {
  'uname': '',
  'totalHeight': totalHeight,
  'headerHeight': headerHeight,
  'bodyHeight': totalHeight - headerHeight
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
