<template>
  <div>
    <p class="weui-msg__title wx-page-title">个人信息</p>

    <div class="weui-cells__title">居住信息</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">现居城市</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入您的现居城市">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">详细地址</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入您的详细地址">
        </div>
      </div>

      <div class="weui-cell wx-select-box">
        <div class="weui-cell__hd"><label class="weui-label">居住时长</label></div>
        <div class="weui-cell__bd">
          <select class="weui-select" name="select1">
            <option class="select-option" disabled value="">请选择</option>
            <option class="select-option">一年</option>
          </select>
        </div>
      </div>


    </div>


    <div class="weui-cells weui-cells_form wx-identity-self-photo">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">持证自拍</label></div>
      </div>
    </div>

    <div class="weui-cells weui-cells_form wx-identity-self-photo">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label wx-id-label">身份证正面(人像)</label></div>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  import tabbar from "./tabbar.vue";

  export default {
    components: {tabbar},
    name: 'profile-person',
    data() {
      return {}
    },
    computed: {},
    methods: {}
  }
</script>

<style scoped>
  .weui-cells__title {
    text-align: left;
  }

  .weui-cell {
    text-align: left;
  }

  .wx-identity-self-photo {
    margin-top: 24px;
  }

  .wx-id-label {
    width: auto;
  }

  .wx-select-box {
    height: 25px;
  }
  .weui-select {
    padding-left: 0;
  }
</style>
