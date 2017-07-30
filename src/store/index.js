import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  currentTab: 'store',
  userInfo: {
    phoneNumber: '',
    token: null
  },
  host: 'http://localhost:8090',
  paths: {
    SEND_CODE: '/sendcode',
    AUTH: '/auth'
  }
}

const getters = {
  postSendCode: state => {
    return state.host + state.paths.SEND_CODE;
  },
  postAuth: state => {
    return state.host + state.paths.AUTH;
  }
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
