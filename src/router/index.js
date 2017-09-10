import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('@/page/login')
const Home = () => import('@/page/home')
const Repay = () => import('@/page/repay')
const Profile = () => import('@/page/profile')
const ProfileId = () => import('@/page/profile-id')
const ProfilePerson = () => import('@/page/profile-person')
const Service = () => import('@/page/service')
const ApplyStatus = () => import('@/page/apply-status')
const Password = () => import('@/page/password')
const FAQ = () => import('@/page/faq')
const CustomerService = () => import('@/page/customer-service')
const ApplicationSummary = () => import('@/page/application-summary')
const Refer = () => import('@/page/refer')
const ProfileBank = () => import('@/page/profile-bank')
const AddBank = () => import('@/page/add-bank')

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
      name: 'ProfileId',
      component: ProfileId
    },
    {
      path: '/profile/person',
      name: 'ProfilePerson',
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
      name: 'Root',
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
