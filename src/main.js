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
import mixin from './mixin'

Vue.config.productionTip = false


Vue.directive('mask', VueMaskDirective);

Vue.component('modal', Modal)
Vue.component('alert', Alert)
Vue.component('loading-toast', LoadingToast)
Vue.component('error-toast', ErrorToast)

Vue.mixin(mixin)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
