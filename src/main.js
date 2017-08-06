// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'weui'
import 'animate.css'
import VeeValidate from 'vee-validate'
import {VueMaskDirective} from 'v-mask'
import Modal from './components/modal.vue'
import LoadingToast from './components/loading-toast.vue'

Vue.config.productionTip = false


Vue.directive('mask', VueMaskDirective);

Vue.component('modal', Modal)
Vue.component('loading-toast', LoadingToast)

Vue.use(VeeValidate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
