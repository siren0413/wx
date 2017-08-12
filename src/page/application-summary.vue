<template>
  <div>

    <div v-if="submitStatus == 0">
      <div>
        <div class="weui-cells__title">申请资料</div>
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">实名认证</div>

            <router-link to="/profile-id" class="weui-cell__ft" style="font-size: 0" v-if="profiles.id == false">
              <span style="vertical-align:middle; font-size: 17px;">未完成</span>
              <span class="weui-badge weui-badge_dot" style="margin-left: 5px;margin-right: 5px;"></span>
            </router-link>
            <div class="weui-cell wx-cell-noaccess" style="font-size: 0" v-if="profiles.id">
              <span style="vertical-align:middle; font-size: 17px;">已完成</span>
              <i class="weui-icon-success"></i>
            </div>
          </div>

          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">手机验证</div>
            <div class="weui-cell__ft" style="font-size: 0" v-if="profiles.phone == false">
              <span style="vertical-align:middle; font-size: 17px;">未完成</span>
              <span class="weui-badge weui-badge_dot" style="margin-left: 5px;margin-right: 5px;"></span>
            </div>
            <div class="weui-cell wx-cell-noaccess" style="font-size: 0" v-if="profiles.phone">
              <span style="vertical-align:middle; font-size: 17px;">已完成</span>
              <i class="weui-icon-success"></i>
            </div>
          </div>

          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">个人信息</div>
            <router-link to="/profile-person" class="weui-cell__ft" style="font-size: 0" v-if="profiles.personal == false">
              <span style="vertical-align:middle; font-size: 17px;">未完成</span>
              <span class="weui-badge weui-badge_dot" style="margin-left: 5px;margin-right: 5px;"></span>
            </router-link>
            <div class="weui-cell wx-cell-noaccess" style="font-size: 0" v-if="profiles.personal">
              <span style="vertical-align:middle; font-size: 17px;">已完成</span>
              <i class="weui-icon-success"></i>
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
            <router-link to="/store" class="weui-btn weui-btn_default">返回</router-link>
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
            <a href="javascript:history.back();" class="weui-btn weui-btn_default">返回</a>
          </p>
        </div>
      </div>
    </div>

    <div class="wx-bot-margin"></div>

    <loading-toast></loading-toast>
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
          alertTitle:'',
          alertDesc:''
        },
        profiles: {
          id: null,
          phone: null,
          personal: null
        }
      }
    },
    computed: {
      ...mapState(['applicationInfo'])
    },
    methods: {
      ...mapActions(['incLoadingCount', 'decLoadingCount']),
      submit() {
        if (!this.profiles.id) {
          this.alerts.alertTitle = '提交失败'
          this.alerts.alertDesc = '请检查实名认证信息是否填写完整'
          this.alerts.showAlert = true
          return
        }
        if (!this.profiles.phone) {
          this.alerts.alertTitle = '提交失败'
          this.alerts.alertDesc = '请检查完成手机验证是否完成'
          this.alerts.showAlert = true
          return
        }
        if (!this.profiles.personal) {
          this.alerts.alertTitle = '提交失败'
          this.alerts.alertDesc = '请检查个人信息是否填写完整'
          this.alerts.showAlert = true
          return
        }
        this.incLoadingCount()
        this.$http.post('/api/v1/loan/application', {
          amount: this.applicationInfo.amount,
          expire: moment(this.applicationInfo.expire, "YYYY年MM月DD日"),
          fee: this.applicationInfo.fee
        })
          .then((response) => {
            this.decLoadingCount()
            this.submitStatus = 1
          })
          .catch((error) => {
            this.decLoadingCount()
            this.submitStatus = 0
          })
      }
    },
    created(){
      this.incLoadingCount()
      this.$http.get(`/api/v1/user/${this.uid()}/profile/general/status`)
        .then((response) => {
          if (response.data.status === 0) this.profiles.personal=true;
          else this.profiles.personal=false;
          this.decLoadingCount()
        })
        .catch((error) => {
          this.decLoadingCount()
        })

      this.incLoadingCount()
      this.$http.get(`/api/v1/user/${this.uid()}/profile/identity/status`)
        .then((response) => {
          if (response.data.status === 0) this.profiles.id=true;
          else this.profiles.id=false;
          this.decLoadingCount()
        })
        .catch((error) => {
          this.decLoadingCount()
        })
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
  .wx-cell-noaccess{
    padding-right: 0;
  }

  .weui-form-preview {
    padding-top: 20px;
  }
</style>
