// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'weui'
import 'animate.css'
import VeeValidate from 'vee-validate'
import axios_instance from './ajax'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

Vue.use(axios_instance, VueAxios)
Vue.use(VeeValidate)


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


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
