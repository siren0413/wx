import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../ajax'

Vue.use(Vuex)

const state = {
  userInfo: {
    phoneNumber: '',
    token: null
  },
  loanConfigs: []
}

const getters = {}

const mutations = {
  savePhoneNumber(state, phoneNumber) {
    state.userInfo.phoneNumber = phoneNumber;
  },
  saveToken(state, token) {
    state.userInfo.token = token;
  },
}

const actions = {
  getLoanConfigs(context) {
    axios.get('/api/v1/loan/configs')
      .then(function (response) {
        state.loanConfigs = response.data
      })
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
