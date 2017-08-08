import Vue from 'vue'
import Router from 'vue-router'
import axios from '../ajax'
import Login from '@/components/login'
import Store from '@/components/store'
import Repay from '@/components/repay'
import Profile from '@/components/profile'
import ProfileId from '@/components/profile-id'
import ProfilePerson from '@/components/profile-person'
import Service from '@/components/service'
import ApplyStatus from '@/components/apply-status'
import StoreFront from '@/components/store-front'
import Password from '@/components/password'
import FAQ from '@/components/faq'
import CustomerService from '@/components/customer-service'
import Refer from '@/components/refer'

Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Hello',
    //   component: Hello
    // },
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
    },
    {
      path: '/apply-status',
      name: 'ApplyStatus',
      component: ApplyStatus
    },
    {
      path: '/service-password',
      name: 'Password',
      component: Password
    },
    {
      path: '/faq',
      name: 'faq',
      component: FAQ
    },
    {
      path: '/customer-service',
      name: 'CustomerService',
      component: CustomerService
    },
    {
      path: '/refer',
      name: 'Refer',
      component: Refer
    },
    {
      path: '/*',
      name: 'Error',
      component: Store
    }
  ]
})

router.beforeEach((to,from,next) => {
  console.log('to ' +to.path)
  console.log('from ' +to.path)
  if (to.path !== '/login') {
    axios.get('/api/v1/tokeninfo')
      .then((response) => {
        next()
      })
      .catch((error) => {
        router.push('/login')
      })
  } else {
    next()
  }
})

// router.beforeEach(
//   (to, from, next) => {
//     console.log("from: " + from.path + " to: " + to.path)
//     if (to.path !== '/login') {
//       next()
//     } else {
//       if (localStorage.getItem('accessToken')) {
//         axios.get('/api/v1/tokeninfo')
//           .then((response) => {
//             if (to.path === '/login') {
//               router.push('/store')
//             } else {
//               next()
//             }
//           })
//           .catch((error) => {
//             next()
//           })
//       } else {
//         next()
//       }
//     }
//   }
// )

export default router
