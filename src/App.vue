<template>
  <div id="app">
    <router-view></router-view>
    <tabbar v-if="$route.path !== '/login'"></tabbar>
  </div>
</template>

<script>
  import tabbar from "./components/tabbar.vue";

  export default {
    components: {tabbar},
    name: 'app'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    /*color: #2c3e50;*/
    /*margin-top: 10px;*/
  }
</style>
