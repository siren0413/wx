<template>
  <div id="loadingToast" :class="[showErrorToast? 'toast-on': 'toast-off']">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
      <i class="fa fa-exclamation" aria-hidden="true" style="font-size: 30px; margin-top: 30px"></i>
      <p class="weui-toast__content">{{message}}</p>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    props: ['message'],
    name: 'error-toast',
    computed: {
      ...mapState(['showErrorToast'])
    }
  }
</script>

<style scoped>
  .toast-on {
    opacity: 1;
  }

  .toast-off {
    opacity: 0;
    display: none;
  }
  .weui-toast__content{
    padding-top: 5px;
  }
</style>
