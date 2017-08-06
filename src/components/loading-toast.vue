<template>
  <div id="loadingToast" :class="[loadingCount !== 0? 'toast-on': 'toast-off']">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
      <i class="weui-loading weui-icon_toast"></i>
      <p class="weui-toast__content">数据加载中</p>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    props: {},
    name: 'store',
    data() {
      return {}
    },
    computed: {
      ...mapState(['loadingCount'])
    },
    methods: {}
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
</style>
