a<template>
  <div>

    <h1>
      profile phone
    </h1>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  import tabbar from "./tabbar.vue";

  export default {
    components: {tabbar},
    name: 'profile-phone',
    data() {
      return {}
    },
    computed: {},
    methods: {}
  }
</script>

<style scoped>
  .weui-cell {
    text-align: left;
  }
</style>
