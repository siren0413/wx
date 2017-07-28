import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  userInfo: {
    phoneNumber: null
  }
}


const mutations = {
  savePhoneNumber(state, phoneNumber) {
    state.userInfo.phoneNumber = phoneNumber;
  }
}

const actions = {

}

export default new Vuex.Store({
  state,
  actions,
  mutations,
})
