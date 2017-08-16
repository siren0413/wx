import Vue from 'vue'
import Router from 'vue-router'
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
import ProfileBank from '@/page/profile-bank'
import AddBank from '@/page/add-bank'

Vue.use(Router)

const router = new Router({
  routes: [
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
      path: '/profile/id',
      name: 'Profile-Id',
      component: ProfileId
    },
    {
      path: '/profile/person',
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
      path: '/profile/bank',
      name: 'ProfileBank',
      component: ProfileBank
    },
    {
      path: '/profile/bank/add',
      name: 'AddBank',
      component: AddBank
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/*',
      name: 'Error',
      component: Home
    }
  ]
})


export default router
