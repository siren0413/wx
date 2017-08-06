import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../ajax'

Vue.use(Vuex)

const state = {
  userInfo: {
    phoneNumber: '',
    token: null
  },
  loadingCount: 0
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
  incLoadingCount(){
    console.log("loading count++")
    state.loadingCount++
  },
  decLoadingCount(){
    console.log("loading count--")
    state.loadingCount--
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
