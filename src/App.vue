<template>
  <div id="app">
    <wxHeader v-if="$route.path !== '/login' && $route.path !== '/store-front'"></wxHeader>
    <transition name="fade" mode="out-in" v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter">
      <keep-alive :exclude=['profile','service','password']>
        <router-view class="wx-container"></router-view>
      </keep-alive>
    </transition>
    <tabbar class="wx-tabbar" v-if="$route.path !== '/login' && $route.path !== '/store-front'"></tabbar>
  </div>
</template>

<script>
  import tabbar from "./components/tabbar.vue";
  import wxHeader from "./components/header.vue"

  export default {
    components: {tabbar, wxHeader},
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
    height: 100%;
    width: 100%;
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

  .wx-bot-margin {
    height: 10%;
  }
  .wx-page-title {
    color: dimgrey;
    height: 10%;
    max-height: 48px;
  }
  .wx-tabbar {
    position: fixed;
    bottom: 0;
    width: 100%;
    opacity: 1;
    z-index: 1000;
    height: 10%;
    min-height: 55px;
    max-height: 60px;
  }

  .wx-container {
    top: 20px;
    height: 79%;
    overflow: scroll;
  }

  html, body {
    background: rgb(252, 252, 252);
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
</style>
