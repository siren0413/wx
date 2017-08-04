<template>
  <div id="app">
    <transition name="fade" mode="out-in" v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter">
      <keep-alive exclude="profile">
        <router-view></router-view>
      </keep-alive>
    </transition>
    <tabbar v-if="$route.path !== '/login' && $route.path !== '/store-front'"></tabbar>
  </div>
</template>

<script>
  import tabbar from "./components/tabbar.vue";

  export default {
    components: {tabbar},
    name: 'app',
    methods: {
      beforeEnter() {
        //TODO
      },
      afterEnter() {
        //TODO
      }
    }
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
  .wx-page-title {
    padding-top: 18px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .1s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0
  }
  .weui-btn-area {
    margin-top: 50px;
  }
  .text-mask {
    color: grey;
  }
  html, body {
    background: rgb(252, 252, 252);
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
</style>
