<template>
  <div>
    <div class="logo">Logo</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell"
           v-bind:class="{'weui-cell_warn' : errors.has('phoneNumber') || !isValidPhone, 'animated shake': animatePhone}">
        <div class="weui-cell__bd">
          <input class="weui-input" type="number" v-validate="{max:11}" name="phoneNumber" v-model="phoneNumber"
                 @blur="validatePhoneNumber" @focus="isValidPhone=true"
                 placeholder="手机号码"/>
        </div>
        <div class="weui-cell__ft">
          <div v-if="errors.has('phoneNumber') || !isValidPhone">
            <i class="weui-icon-warn"></i>
          </div>
          <div v-else-if="isValidPhoneNumber">
            <i class="weui-icon-success"></i>
          </div>
        </div>
      </div>

      <div class="weui-cell" :class="[{'animated shake': animateSms}]">
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

    <div class="tos weui-cell weui-cell_switch" :class="[{'animated shake': animateTos}]">
      <div class="weui-cell__bd ">我已经阅读并同意<a href="#">服务条款协议</a></div>
      <div class="weui-cell__ft">
        <label for="switchCP" class="weui-switch-cp">
          <input id="switchCP" class="weui-switch-cp__input" type="checkbox" v-model="agreeTos">
          <div class="weui-switch-cp__box"></div>
        </label>
      </div>
    </div>

    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" :class="[{'weui-btn_disabled': !allInputValid}]" @click="login">登录</a>
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
  import {mapMutations, mapState, mapGetters} from 'vuex'
  import router from '../router'

  export default {
    name: 'login',
    data() {
      return {
        phoneNumber: '',
        smsCode: '',
        smsDisabled: false,
        time: 60,
        agreeTos: false,
        isValidPhone: true,
        isValidSms: true,
        animateTos: false,
        animatePhone: false,
        animateSms: false
      }
    },
    computed: {
      isValidPhoneNumber: function () {
        return this.phoneNumber.length === 11
      },
      allInputValid() {
        return this.phoneNumber.length === 11 && this.agreeTos && this.smsCode.length === 6
      }
    },
    methods: {
      ...mapMutations({
        savePhoneNumber: 'savePhoneNumber',
        saveToken: 'saveToken'
      }),
      login: function () {
        this.savePhoneNumber(this.phoneNumber)
        this.$validator.validateAll().then(result => {
        });
        let success = true;
        if (this.phoneNumber.length !== 11) {
          this.animatePhone = true;
          success = false;
        }
        if (!this.agreeTos) {
          this.animateTos = true;
          success = false;
        }
        if (this.smsCode.length !== 6) {
          this.animateSms = true;
          success = false;
        }
        if (success) {
          this.$http.post('/api/v1/auth', {
            phoneNumber: this.phoneNumber,
            code: this.smsCode,
            agreeTos: this.agreeTos
          })
            .then(function (response) {
              // save token
              localStorage.setItem('accessToken', response.data.accessToken)
              router.push('/store')
            })
            .catch(function (error) {
            })
        }
      },
      sendCode: function () {
        if (this.phoneNumber.length !== 11) {
          this.animatePhone = true;
          return
        }
        this.smsDisabled = true;
        this.startTimer();

        this.$http.post('/api/v1/sendcode', {
          phoneNumber: this.phoneNumber
        })
          .then(function (response) {

          }.bind(this))
          .catch(function (error) {
            this.animatePhone = true;
            this.stopTimer();
          }.bind(this));
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
      cleanupTimer() {
        this.animateTos = false;
        this.animatePhone = false;
        this.animateSms = false;
      },
      validatePhoneNumber: function () {
        this.isValidPhone = this.phoneNumber.length === 11;
      }
    },
    created() {
      setInterval(this.cleanupTimer, 2000)
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

  .sms-cooldown-btn {
    color: gray;
  }

  .tos {
    margin-top: 60px;
    padding-left: 18px;
    font-size: 16px;
    color: #999999;
  }

  .tos:before {
    border: none;
  }

  .weui-footer {
    position: absolute;
    bottom: 10px;
    width: 100%;
    height: 50px; /* Height of the footer */
  }

  .weui-cell {
    animation-duration: 0.5s;
    animation-iteration-count: 1;
  }


</style>
