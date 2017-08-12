import Vue from 'vue'
import Axios from 'axios';
import VueAxios from 'vue-axios'
import router from '../router'

const axios = Axios.create({
  baseURL: 'http://192.168.1.192',
  headers: {'Content-Type': 'application/json'}
});

Vue.use(axios, VueAxios)

Vue.prototype.$http = axios

axios.interceptors.request.use(config => {
  if (localStorage.getItem('accessToken')) {
    config.headers = {Authorization: 'Bearer ' + localStorage.getItem('accessToken')}
  }
  return config;
})

axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    localStorage.removeItem('accessToken')
    router.push('/login')
  }
  return Promise.reject(error)
})

export default axios


