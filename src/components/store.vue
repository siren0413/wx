<template>
  <div>
    <button @click="update">update</button>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  import tabbar from "./tabbar.vue";

  export default {
    components: {tabbar},
    name: 'store',
    data() {
      return {

      }
    },
    computed: {

    },
    methods: {
      update() {
        this.$http.post('/hello', {
          phoneNumber: '13705753423'
        })
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
      }

    }
  }
</script>

<style scoped>

</style>
