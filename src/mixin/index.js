import {mapActions} from 'vuex'
import moment from 'moment'

export default {
  methods: {
    ...mapActions(['checkToken']),
    uid() {
      let token = localStorage.getItem('accessToken')
      if (token) {
        let parts = token.split('.')
        if (parts.length === 3) {
          let s = this.base64Decode(parts[1])
          let claims = JSON.parse(s)
          return claims.sub
        }
      }
    },
    base64Decode(str){
      return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    },
    formatDate(unixTime, format) {
      return moment(unixTime).format(format)
    }
  },
  created() {
    this.checkToken()
  },
  filters: {
    maskId: function (value) {
      if (!value) return ''
      value = value.toString()
      return '********** ' + value.substring(value.length - 4, value.length)
    },
    maskName: function (value) {
      if (!value) return ''
      value = value.toString()
      return '** ' + value.substring(value.length - 1, value.length)
    },
    maskBankAccount: function (value) {
      if (!value) return ''
      value = value.toString()
      return '尾号 ' + value.substring(value.length - 4, value.length)
    }
  }
}
