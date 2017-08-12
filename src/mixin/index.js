import {mapActions} from 'vuex'

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
    }
  },
  created() {
    this.checkToken()
  }
}
