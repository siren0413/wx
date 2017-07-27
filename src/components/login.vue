<template>
  <div>
    <div>Logo</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <input class="weui-input" type="tel" v-model="phone_number" placeholder="手机号码"/>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <input class="weui-input" pattern="[0-9a-zA-Z]*" v-model="captcha" placeholder="图形验证码"/>
        </div>
        <div class="weui-cell__ft">
          <button class="weui-vcode-btn">获取图形验证码</button>
        </div>
      </div>

      <div class="weui-cell">
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="sms_code" placeholder="短信验证码"/>
        </div>
        <div class="weui-cell__ft">
          <button class="weui-vcode-btn">获取短信验证码</button>
        </div>
      </div>
    </div>

    <div class="tos weui-cell weui-cell_switch">
      <div class="weui-cell__bd">我已经阅读并同意服务条款协议</div>
      <div class="weui-cell__ft">
        <label for="switchCP" class="weui-switch-cp">
          <input id="switchCP" class="weui-switch-cp__input" type="checkbox" v-model="agree_tos">
          <div class="weui-switch-cp__box"></div>
        </label>
      </div>
    </div>

    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" @click="login" >登录</a>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        phone_number: null,
        captcha: null,
        sms_code: null,
        agree_tos: false
      }
    },
    methods: {
      login: function () {

      }
    }
  }
</script>

<style scoped>

  .weui-cell {
    height: 45px;
    font-size: 18px;
    text-align: left;
  }
  .tos {
    margin-top: 10px;
  }
  .tos:before{
    border: none;
  }


</style>
