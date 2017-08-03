<template>
  <div>
    <p class="weui-msg__title wx-page-title">实名认证</p>

    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入您的姓名">
        </div>
      </div>

      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">身份证号</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入您的身份证号">
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

    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" @click="save">保存</a>
    </div>

  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  import tabbar from "./tabbar.vue";

  export default {
    components: {tabbar},
    name: 'profile-id',
    data() {
      return {}
    },
    computed: {},
    methods: {
      save() {

      }
    }
  }
</script>

<style scoped>
  .weui-cell {
    text-align: left;
  }

  .wx-identity-self-photo {
    margin-top: 24px;
  }
  .wx-id-label{
    width: auto;
  }
</style>
