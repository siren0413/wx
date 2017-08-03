import Vue from 'vue'
import Router from 'vue-router'
import axios from '../ajax'
import Hello from '@/components/Hello'
import Login from '@/components/login'
import Store from '@/components/store'
import Repay from '@/components/repay'
import Profile from '@/components/profile'
import ProfileId from '@/components/profile-id'
import ProfilePerson from '@/components/profile-person'
import Service from '@/components/service'
import StoreFront from '@/components/store-front'

Vue.use(Router)

const router = new Router({
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
      path: '/store-front',
      name: 'StoreFront',
      component: StoreFront
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
      path: '/profile-id',
      name: 'Profile-Id',
      component: ProfileId
    },
    {
      path: '/profile-person',
      name: 'Profile-Person',
      component: ProfilePerson
    },
    {
      path: '/service',
      name: 'Service',
      component: Service
    }
  ]
})

router.beforeEach(
  (to, from, next) => {
    // console.log("from: " + from.path + " to: " + to.path)
    if (localStorage.getItem('accessToken')) {
      axios.get('/api/v1/tokeninfo')
        .then(function (response) {
          if (to.path === '/login') {
            router.push(from.path)
          } else {
            next()
          }
        })
        .catch(function (error) {
          if (to.path !== '/login') {
            router.push('/login')
          }
        })
    } else {
      if (to.path !== '/login' && to.path !== '/store-front') {
        router.push('/login')
      } else {
        next()
      }
    }
  }
)

export default router
