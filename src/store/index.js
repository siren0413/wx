import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  currentTab: 'store',
  userInfo: {
    phoneNumber: '',
    token: null
  },
}

const getters = {

}

const mutations = {
  savePhoneNumber(state, phoneNumber) {
    state.userInfo.phoneNumber = phoneNumber;
  },
  saveToken(state, token) {
    state.userInfo.token = token;
  },
  activateTab(state, tab) {
    state.currentTab = tab
  }
}

const actions = {}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
