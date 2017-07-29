<template>
  <div>
    <div class="logo">Logo</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell" v-bind:class="{'weui-cell_warn' : errors.has('phoneNumber')}">
        <div class="weui-cell__bd">
          <input class="weui-input" type="number" v-validate="{max:11}" name="phoneNumber" v-model="phoneNumber"
                 placeholder="手机号码"/>
        </div>

        <div class="weui-cell__ft">
          <div v-if="errors.has('phoneNumber')">
            <i class="weui-icon-warn"></i>
          </div>
          <div v-else-if="isValidPhoneNumber">
            <i class="weui-icon-success" v-if="!errors.has('phoneNumber')"></i>
          </div>
        </div>
      </div>

      <div class="weui-cell">
        <div class="weui-cell__bd">
          <input class="weui-input" maxlength="6" v-model="smsCode" placeholder="短信验证码"/>
        </div>
        <div class="weui-cell__ft">
          <div v-if="smsDisabled">
            <button class="weui-vcode-btn sms-cooldown-btn" :disabled="smsDisabled">{{time}} 秒后重新获取</button>
          </div>
          <div v-else>
            <button class="weui-vcode-btn" @click="sendCode" :disabled="smsDisabled">获取短信验证码</button>
          </div>
        </div>
      </div>
    </div>

    <div class="tos weui-cell weui-cell_switch">
      <div class="weui-cell__bd">我已经阅读并同意<a href="#">服务条款协议</a></div>
      <div class="weui-cell__ft">
        <label for="switchCP" class="weui-switch-cp">
          <input id="switchCP" class="weui-switch-cp__input" type="checkbox" v-model="agreeTos">
          <div class="weui-switch-cp__box"></div>
        </label>
      </div>
    </div>

    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" @click="login">登录</a>
    </div>

    <div class="weui-footer">
      <p class="weui-footer__links">
        <a href="javascript:void(0);" class="weui-footer__link">底部链接</a>
        <a href="javascript:void(0);" class="weui-footer__link">底部链接</a>
      </p>
      <p class="weui-footer__text">Copyright © 2008-2016 weui.io</p>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: 'login',
    data() {
      return {
        phoneNumber: '',
        smsCode: null,
        smsDisabled: false,
        time: 60,
        agreeTos: false
      }
    },
    computed: {
      isValidPhoneNumber: function () {
        return this.phoneNumber.length === 11
      }
    },
    methods: {
      ...mapMutations({
        savePhoneNumber: 'savePhoneNumber'
      }),
      login: function () {
        this.savePhoneNumber(this.phoneNumber)
      },
      sendCode: function () {
        this.smsDisabled = true;
        // ajax
        this.startTimer()
      },
      timer: function () {
        if (this.time > 0) {
          this.time--;
          setTimeout(this.timer, 1000);
        } else {
          this.smsDisabled = false;
        }
      },
      startTimer: function () {
        this.time = 60;
        this.timer();
      },
      stopTimer: function () {
        this.time = 0;
        this.smsDisabled = false;
      },
    }
  }
</script>

<style scoped>

  .logo {
    margin-top: 160px;
  }
  .weui-cell {
    height: 45px;
    font-size: 18px;
    text-align: left;
  }

  .sms-cooldown-btn{
    color: gray;
  }

  .tos {
    margin-top: 60px;
    font-size: 17px;
  }

  .tos:before {
    border: none;
  }

  .weui-footer {
    position: absolute;
    bottom: 20px;
    width: 100%;
    height: 50px; /* Height of the footer */
  }
</style>
