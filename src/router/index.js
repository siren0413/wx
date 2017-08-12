import Vue from 'vue'
import Router from 'vue-router'
import axios from '../ajax'
import Login from '@/page/login'
import Home from '@/page/home'
import Repay from '@/page/repay'
import Profile from '@/page/profile'
import ProfileId from '@/page/profile-id'
import ProfilePerson from '@/page/profile-person'
import Service from '@/page/service'
import ApplyStatus from '@/page/apply-status'
import StoreFront from '@/page/store-front'
import Password from '@/page/password'
import FAQ from '@/page/faq'
import CustomerService from '@/page/customer-service'
import ApplicationSummary from '@/page/application-summary'
import Refer from '@/page/refer'

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
      path: '/home',
      name: 'Home',
      component: Home
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
      path: '/application-summary',
      name: 'ApplicationSummary',
      component: ApplicationSummary
    },
    {
      path: '/*',
      name: 'Error',
      component: Home
    }
  ]
})

// router.beforeEach((to,from,next) => {
//   if (to.path !== '/login') {
//     axios.get('/api/v1/tokeninfo')
//       .then((response) => {
//         next()
//       })
//       .catch((error) => {
//         router.push('/login')
//       })
//   } else {
//     next()
//   }
// })

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
