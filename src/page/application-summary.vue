<template>
  <div>

    <div v-if="submitStatus == 0">
      <div>
        <div class="weui-cells__title">申请资料</div>
        <div class="weui-cells weui-cells_form">
          <router-link :to="{name:'ProfileId', query: {referrer: 'ApplicationSummary'}}" class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">实名认证</div>

            <div class="weui-cell__ft" style="font-size: 0" v-if="profiles.id === false">
              <span style="vertical-align:middle; font-size: 17px;">未完成</span>
              <span class="weui-badge weui-badge_dot" style="margin-left: 5px;margin-right: 5px;"></span>
            </div>
            <div class="weui-cell wx-cell-noaccess" style="font-size: 0" v-if="profiles.id">
              <span style="vertical-align:middle; font-size: 17px;">已完成</span>
              <i class="weui-icon-success"></i>
            </div>
          </router-link>

          <router-link :to="{name:'ProfilePerson', query: {referrer: 'ApplicationSummary'}}"  class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">个人信息</div>
            <div class="weui-cell__ft" style="font-size: 0" v-if="profiles.personal === false">
              <span style="vertical-align:middle; font-size: 17px;">未完成</span>
              <span class="weui-badge weui-badge_dot" style="margin-left: 5px;margin-right: 5px;"></span>
            </div>
            <div class="weui-cell wx-cell-noaccess" style="font-size: 0" v-if="profiles.personal">
              <span style="vertical-align:middle; font-size: 17px;">已完成</span>
              <i class="weui-icon-success"></i>
            </div>
          </router-link>
          <div class="weui-cell" :class="{'animated shake': animatePin}">
            <div class="weui-cell__hd"><label class="weui-label">手机PIN码</label></div>
            <div class="weui-cell__bd">
              <input class="weui-input" style="text-align: right" type="number" pattern="[0-9]*" v-mask="'####'" v-model="pin" placeholder="请输入手机PIN码">
            </div>
          </div>
        </div>
      </div>

      <div class="weui-form-preview">
        <div class="weui-form-preview__hd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">到期还款</label>
            <em class="weui-form-preview__value">¥{{applicationInfo.amount + applicationInfo.fee}}</em>
          </div>
        </div>
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">贷款金额</label>
            <span class="weui-form-preview__value">¥{{applicationInfo.amount}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">服务费用</label>
            <span class="weui-form-preview__value">¥{{applicationInfo.fee}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">还款日期</label>
            <span class="weui-form-preview__value">{{applicationInfo.expire}}</span>
          </div>
        </div>
        <div class="weui-form-preview__ft">
          <a class="weui-form-preview__btn weui-form-preview__btn_primary" @click="submit">提交审核</a>
        </div>
      </div>
    </div>


    <div class="page msg_success" v-if="submitStatus == 1">
      <div class="weui-msg">
        <div class="weui-msg__icon-area"><i class="weui-icon-success weui-icon_msg"></i></div>
        <div class="weui-msg__text-area">
          <h2 class="weui-msg__title">提交成功</h2>
          <p class="weui-msg__desc">恭喜您成功提交了审核申请，我们会立马处理您的审核资料，请您耐心等待</p>
        </div>
        <div class="weui-msg__opr-area">
          <p class="weui-btn-area">
            <router-link to="/apply-status" class="weui-btn weui-btn_primary">查看审核进度</router-link>
            <router-link to="/home" class="weui-btn weui-btn_default">返回</router-link>
          </p>
        </div>
      </div>
    </div>

    <div class="page msg_warn js_show" v-if="submitStatus == 2">
      <div class="weui-msg">
        <div class="weui-msg__icon-area"><i class="weui-icon-warn weui-icon_msg"></i></div>
        <div class="weui-msg__text-area">
          <h2 class="weui-msg__title">提交失败</h2>
          <p class="weui-msg__desc">很抱歉，审核申请提交失败，请稍后再试</p>
        </div>
        <div class="weui-msg__opr-area">
          <p class="weui-btn-area">
            <router-link to="/home" class="weui-btn weui-btn_default">返回</router-link>
          </p>
        </div>
      </div>
    </div>

    <div class="wx-bot-margin"></div>

    <alert v-if="alerts.showAlert" @ok="alerts.showAlert=false" :title="alerts.alertTitle" :desc="alerts.alertDesc"></alert>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import tabbar from "../components/tabbar.vue";
  import moment from 'moment'

  export default {
    components: {tabbar},
    name: 'store',
    data() {
      return {
        submitStatus: 0,
        alerts: {
          showAlert: false,
          alertTitle: '',
          alertDesc: ''
        },
        profiles: {
          id: null,
          personal: null
        },
        pin: null,
        animatePin: false
      }
    },
    computed: {
      ...mapState(['applicationInfo'])
    },
    methods: {
      submit() {
        if (!this.profiles.id) {
          this.alerts.alertTitle = '提交失败'
          this.alerts.alertDesc = '请检查实名认证信息是否填写完整'
          this.alerts.showAlert = true
          return
        }
        if (!this.profiles.personal) {
          this.alerts.alertTitle = '提交失败'
          this.alerts.alertDesc = '请检查个人信息是否填写完整'
          this.alerts.showAlert = true
          return
        }
        if (!/[0-9]{4}/.test(this.pin)) {
          this.animatePin = true
          return
        }
        this.$http.post(`/api/public/user/${this.uid()}/loan/application`, {
          amount: this.applicationInfo.amount,
          term: this.applicationInfo.term,
          fee: this.applicationInfo.fee,
          pin: this.pin
        })
          .then((response) => {
            this.submitStatus = 1
          })
          .catch((error) => {
            this.submitStatus = 2
          })
      }
    },
    created() {
      this.$http.get(`/api/public/user/${this.uid()}/profile/personal/complete`)
        .then((response) => {
          this.profiles.personal = response.data.status === 0;
        })
      this.$http.get(`/api/public/user/${this.uid()}/profile/identity/complete`)
        .then((response) => {
          this.profiles.id = response.data.status === 0;
        })
      setInterval(() => {
        this.animatePin = false
      }, 2000)
    }
  }
</script>

<style scoped>
  .weui-cells__title {
    text-align: left;
    margin-top: 20px;
  }

  .weui-cell {
    text-align: left;
    height: 25px;
  }

  .wx-cell-noaccess {
    padding-right: 0;
  }

  .weui-form-preview {
    padding-top: 10vw;
  }
</style>
