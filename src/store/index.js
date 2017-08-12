import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../ajax'
import router from '../router'

Vue.use(Vuex)

const state = {
  tokenLastChecked: null,
  userInfo: {
    phoneNumber: '',
    token: null
  },
  applicationInfo: {
    amount: null,
    term: null,
    fee: null,
    expire: null
  },
  loadingCount: 0,
  showErrorToast: false
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
  incLoadingCount() {
    state.loadingCount++
  },
  decLoadingCount() {
    state.loadingCount--
  },
  showErrorToast() {
    state.showErrorToast = true
    setTimeout(() => {
      state.showErrorToast = false
    }, 2000)
  },
  checkToken() {
    let now = new Date().getTime()
    if (now - state.tokenLastChecked > 10 * 1000) {
      axios.get('/api/v1/tokeninfo')
        .catch((error) => {
          router.push('/login')
        })
      state.tokenLastChecked = now
    }
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
