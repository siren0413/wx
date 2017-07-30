import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/login'
import Store from '@/components/store'
import Repay from '@/components/repay'
import Profile from '@/components/profile'
import Service from '@/components/service'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/store',
      name: 'Store',
      component: Store
    },
    {
      path: '/repay',
      name: 'Repay',
      component: Repay
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/service',
      name: 'Service',
      component: Service
    }
  ]
})
