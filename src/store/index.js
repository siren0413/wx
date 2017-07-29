import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  userInfo: {
    phoneNumber: null
  },
  host: 'http://127.0.0.1:8090',
  paths: {
    SEND_CODE: '/hello'
  }
}

const getters = {
  getSendCode: state => {
    return state.host + state.paths.SEND_CODE;
  }
}

const mutations = {
  savePhoneNumber(state, phoneNumber) {
    state.userInfo.phoneNumber = phoneNumber;
  }
}

const actions = {}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
