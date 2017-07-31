import Vue from 'vue'
import axios from 'axios';
// import VueAxios from 'vue-axios'

var axios_instance = axios.create({
  baseURL: 'http://127.0.0.1:8090',
  headers: {'Content-Type': 'application/json'}
});

Vue.prototype.$http = axios_instance

axios_instance.interceptors.request.use(config => {
  if (localStorage.getItem('accessToken')) {
    config.headers = {Authorization: 'Bearer ' + localStorage.getItem('accessToken')}
  } else {
  }
  return config;
}, error => {
})

axios_instance.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    localStorage.removeItem('accessToken')
    router.push('/login')
  }
  return Promise.reject(error.response.data)
})

export default axios_instance


