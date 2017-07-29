<template>
  <div>
    <div>Logo</div>
    <div class="weui-cells weui-cells_form" >
      <div class="weui-cell" v-bind:class="{'weui-cell_warn' : errors.has('phoneNumber')}">
        <div class="weui-cell__bd">
          <input class="weui-input" type="number" v-validate="{max:11}" name="phoneNumber" v-model="phoneNumber"
                 placeholder="手机号码"/>
        </div>

        <div class="weui-cell__ft">
          <div v-if="errors.has('phoneNumber')">
            <i class="weui-icon-warn" ></i>
          </div>
          <div v-else-if="isValidPhoneNumber">
            <i class="weui-icon-success" v-if="!errors.has('phoneNumber')"></i>
          </div>
        </div>
      </div>

      <div class="weui-cell">
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="smsCode" placeholder="短信验证码"/>
        </div>
        <div class="weui-cell__ft">
          <button class="weui-vcode-btn">获取短信验证码</button>
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

  .tos:before {
    border: none;
  }


</style>
