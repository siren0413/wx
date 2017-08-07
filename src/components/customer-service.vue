<template>
  <div>
    <div class="wx-faq-container">
      <div>
        <p class="weui-dialog__title">微信客服</p>
        <p class="weui-cells__title">客服超超: placeholder</p>
        <p class="weui-cells__title">客服毛毛: placeholder</p>
      </div>

      <div class="wx-space"></div>
      <div>
        <p class="weui-dialog__title">QQ客服</p>
        <p class="weui-cells__title">客服小X: 1002378821</p>
        <p class="weui-cells__title">客服小Y: 3248234</p>
      </div>
      <div class="wx-space"></div>
      <div>
        <p class="weui-dialog__title">电话客服</p>
        <p class="weui-cells__title">上海: 13793459344</p>
        <p class="weui-cells__title">北京: 13734723848</p>
      </div>
    </div>
    <div class="wx-bot-margin"></div>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  import tabbar from "./tabbar.vue";

  export default {
    components: {tabbar},
    name: 'store',
    data() {
      return {}
    },
    computed: {},
    methods: {}
  }
</script>

<style scoped>
  .wx-faq-container {
    text-align: left;
    padding-left: 15%;
    padding-right: 40px;
    padding-top: 30px;
  }

  .weui-dialog__title {
    padding-left: 15px;
    padding-bottom: 15px;
    font-weight: 500;
    font-size: 16px;
    color: #f76260;
  }
  .wx-space{
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .weui-cells__title{
    margin-top: 0;
  }

</style>
