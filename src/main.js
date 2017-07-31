// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'weui'
import 'animate.css'
import VeeValidate from 'vee-validate'
import axios from 'axios';
import VueAxios from 'vue-axios'

Vue.config.productionTip = false


const axios_instance = axios.create({
  baseURL: 'http://127.0.0.1:8090',
  headers: {'Content-Type': 'application/json'}
});

Vue.use(VeeValidate, axios_instance, VueAxios)

Vue.prototype.$http = axios_instance

router.beforeEach(
  (to, from, next) => {
    if (localStorage.getItem('accessToken')) {
      axios_instance.get('/api/v1/tokeninfo')
        .then(function (response) {
          if (to.path === '/login') {
            router.push('/store')
          } else {
            next()
          }
        })
        .catch(function (error) {
          if (to.path !== '/login'){
            router.push('/login')
          }
        })
    } else {
      if (to.path !== '/login') {
        router.push('/login')
      } else {
        next ()
      }
    }
  }
)


axios_instance.interceptors.request.use(config => {
  if (localStorage.getItem('accessToken')) {
    config.headers = {Authorization: 'Bearer ' + localStorage.getItem('accessToken')}
  } else {
  }
  return config;
}, error => {
})

axios_instance.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    localStorage.removeItem('accessToken')
    router.push('/login')
  }
  return Promise.reject(error.response.data)
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
