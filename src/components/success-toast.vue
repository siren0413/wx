<template>
  <div id="toast" :class="[showSuccessToast? 'toast-on': 'toast-off']">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
      <i class="weui-icon-success-no-circle weui-icon_toast"></i>
      <p class="weui-toast__content">{{message}}</p>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    props: ['message'],
    name: 'success-toast',
    computed: {
      ...mapState(['showSuccessToast'])
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
