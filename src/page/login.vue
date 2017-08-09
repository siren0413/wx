<template>
  <div>
    <div class="logo">
      <p>Logo</p>
    </div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell" :class="{'animated shake': animatePhone}">
        <img class="wx-img-phone" src="../assets/home/phone.png"/>
        <div class="weui-cell__bd">
          <input class="weui-input wx-input-phone" type="tel" pattern="[0-9]*" name="phoneNumber" v-mask="'### #### ####'" v-model="phoneNumber"
                 placeholder="手机号码"/>
        </div>
        <div v-if="isValidPhoneNumber">
          <i style="display: block" class="weui-icon-success"></i>
        </div>
      </div>

      <div class="weui-cell" :class="[{'animated shake': animateSms}]">
        <img class="wx-img-sms" src="../assets/home/sms.png"/>
        <div class="weui-cell__bd">
          <input class="weui-input wx-input-sms" type="tel" pattern="[0-9]*" v-mask="'######'" v-model="smsCode" placeholder="短信验证码"/>
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
      <div class="weui-cell__bd ">我已经阅读并同意<a class="tos-agreement" href="javascript:void(0);">&quot;服务条款协议&quot;</a></div>
      <div class="weui-cell__ft">
        <label for="switchCP" class="weui-switch-cp">
          <input id="switchCP" class="weui-switch-cp__input" type="checkbox" v-model="agreeTos">
          <div class="weui-switch-cp__box"></div>
        </label>
      </div>
    </div>

    <div class="weui-btn-area" @click="login">
      <a class="weui-btn weui-btn_primary" >登录</a>
    </div>

    <div class="weui-footer">
      <p class="weui-footer__links">
        <a href="javascript:void(0);" class="weui-footer__link">底部链接</a>
        <a href="javascript:void(0);" class="weui-footer__link">底部链接</a>
      </p>
      <p class="weui-footer__text">Copyright © 2008-2016 weui.io</p>
    </div>

    <loading-toast></loading-toast>
  </div>
</template>

<script>
  import {mapMutations, mapState, mapGetters, mapActions} from 'vuex'
  import router from '../router/index'

  export default {
    name: 'login',
    data() {
      return {
        phoneNumber: '',
        smsCode: '',
        smsDisabled: false,
        time: 60,
        agreeTos: false,
        animateTos: false,
        animatePhone: false,
        animateSms: false
      }
    },
    computed: {
      isValidPhoneNumber() {
        return /[0-9]{11}/.test(this.phoneNumber.replace(/\s+/g, ''))
      },
      isValidSmsCode() {
        return /[0-9]{6}/.test(this.smsCode)
      }
    },
    methods: {
      ...mapMutations({
        savePhoneNumber: 'savePhoneNumber',
        saveToken: 'saveToken'
      }),
      ...mapActions(['incLoadingCount', 'decLoadingCount']),
      login: function () {
        let success = true;
        if (!this.isValidPhoneNumber) {
          this.animatePhone = true;
          success = false;
        }
        if (!this.isValidSmsCode) {
          this.animateSms = true;
          success = false;
        }
        if (!this.agreeTos) {
          this.animateTos = true;
          success = false;
        }
        if (success) {
          this.incLoadingCount()
          this.$http.post('/api/v1/auth', {
            phoneNumber: this.phoneNumber.replace(/\s+/g, ''),
            code: this.smsCode,
            agreeTos: this.agreeTos
          })
            .then((response) => {
              // save token
              localStorage.setItem('accessToken', response.data.accessToken)
              this.decLoadingCount()
              router.push('/home')
            })
            .catch((error) => {
              // TODO dialog
              this.decLoadingCount()
            })
        }
      },
      sendCode: function () {
        if (!this.isValidPhoneNumber) {
          this.animatePhone = true;
          return
        }
        this.smsDisabled = true;
        this.startTimer();

        this.$http.post('/api/v1/sendcode', {
          phoneNumber: this.phoneNumber.replace(/\s+/g, '')
        })
          .then((response) => {
          })
          .catch((error) => {
            this.animatePhone = true;
            this.stopTimer();
          });
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
      }
    },
    created() {
      setInterval(this.cleanupTimer, 2000)
    }
  }
</script>

<style scoped>

  .logo {
    margin-top: 80px;
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
    margin-top: 30px;
    padding-left: 18px;
    font-size: 14px;
    color: #999999;
  }

  .tos:before {
    border: none;
  }

  .weui-btn-area {
    margin-top: 10px;
  }

  .weui-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px; /* Height of the footer */
    padding-top: 60px;
    padding-bottom: 10px;
  }

  .wx-container {
    height: 100%;
    top: 0
  }

  .wx-img-phone, .wx-img-sms {
    height: 20px;
    width: 20px;
    padding-bottom: 2px;
    padding-right: 10px;
  }

  .tos-agreement {
    color: #6681a7;
  }

  .wx-input-phone, .wx-input-sms {
    font-weight: 400;
    font-size: 18px;
    color: rgb(90, 90, 90);
  }
</style>
