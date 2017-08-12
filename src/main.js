// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'weui'
import 'animate.css'
import 'font-awesome/css/font-awesome.css'
import {VueMaskDirective} from 'v-mask'
import Modal from './components/modal.vue'
import Alert from './components/alert.vue'
import LoadingToast from './components/loading-toast.vue'
import ErrorToast from './components/error-toast.vue'
import axios from './ajax'

Vue.config.productionTip = false


Vue.directive('mask', VueMaskDirective);

Vue.component('modal', Modal)
Vue.component('alert', Alert)
Vue.component('loading-toast', LoadingToast)
Vue.component('error-toast', ErrorToast)


Vue.mixin({
  methods: {
    uid() {
      if (!store.state.token) {
        store.state.token = localStorage.getItem('accessToken')
      }
      let token = store.state.token
      if (token) {
        let parts = token.split('.')
        if (parts.length === 3) {
          let s = this.base64Decode(parts[1])
          let claims = JSON.parse(s)
          return claims.sub
        }
      }
    },
    base64Decode(str){
      return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    }
  },
  token(){
      axios.get('/api/v1/tokeninfo')
        .catch((error) => {
          router.push('/login')
        })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
