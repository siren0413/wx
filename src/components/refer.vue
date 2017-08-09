<template>
  <div>
    <div class="wx-qr-img-container">
      <img class="wx-img-qr" src="../assets/qr-test.png"/>
    </div>

    <div class="wx-qr-desc-container">
      <span class="weui-dialog__title">推荐好友？</span>
      <p class="weui-cells__title">您的好友扫描以上二维码后，即推荐成功。您可以同时推荐多个好友。</p>
    </div>

    <div class="wx-qr-desc-container">
      <span class="weui-dialog__title">获得奖励？</span>
      <p class="weui-cells__title">您的好友在审核通过并第一次成功还款后，您可以获得相应的推荐奖励，奖励可以叠加。</p>
    </div>

    <div class="wx-qr-desc-container">
      <span class="weui-dialog__title">好友未及时还款会影响我的信用吗？</span>
      <p class="weui-cells__title">完全不会。</p>
    </div>

    <div class="wx-bot-margin"></div>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  import tabbar from "./tabbar.vue";

  export default {
    components: {tabbar},
    name: 'refer',
    data() {
      return {}
    },
    computed: {},
    methods: {}
  }
</script>

<style scoped>
  .wx-qr-img-container {
    padding-top: 20px;
  }

  .wx-img-qr {
    height: 180px;
  }
  .wx-qr-desc-container {
    text-align: left;
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 30px;
  }

  .weui-dialog__title {
    padding-left: 15px;
    font-weight: 500;
    font-size: 16px;
    color: #586c94;
  }
</style>
