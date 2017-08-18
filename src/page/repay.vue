<template>
  <div>

    <template v-if="application">
      <div class="weui-cells__title">还款信息</div>
      <div class="weui-form-preview" v-if="application.loanInfo">
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">到期日期</label>
            <span class="weui-form-preview__value">{{formatDate(application.loanInfo.deadline, 'YYYY-MM-DD')}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">到期金额</label>
            <span class="weui-form-preview__value">{{application.loanInfo.amount + application.loanInfo.fee}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">宽限费用</label>
            <span class="weui-form-preview__value">{{application.loanInfo.gracePeriodCharge}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">逾期费用</label>
            <span class="weui-form-preview__value">{{application.loanInfo.overdueCharge}}</span>
          </div>
        </div>
        <div class="weui-form-preview__hd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">应还金额</label>
            <em
              class="weui-form-preview__value">¥ {{ subTotal }}</em>
          </div>
        </div>
      </div>

      <div class="weui-cells__title wx-bank-account-container">选择银行卡</div>
      <div class="weui-cells">
        <a class="weui-cell weui-cell_access" v-if="defaultBankAccount">
          <div class="weui-cell__bd">
            <p>{{formatRepayBankAccount()}}</p>
          </div>
          <router-link :to="{name:'ProfileBank', query: {referrer: 'Repay'}}" class="weui-cell__ft">
            <span>换卡还款</span>
          </router-link>
        </a>
        <router-link :to="{name:'AddBank', query: {referrer: 'Repay'}}" class="weui-cell weui-cell_link" v-if="!defaultBankAccount">
          <div class="weui-cell__bd">添加银行卡</div>
        </router-link>
      </div>


      <div class="weui-btn-area" @click="confirmRepay">
        <a class="weui-btn weui-btn_primary" :class="[{'weui-btn_loading': waitingResponse}]">
          <i v-if="waitingResponse" class="weui-loading"></i>确认还款</a>
      </div>

    </template>

    <template v-else>
      <div>
        <img src="../assets/service/empty.png" style="height: 100px; margin-top: 30%"/>
        <div style="margin-top: 20px; font-size: 16px">
          <p>暂无借款记录</p>
        </div>
      </div>
    </template>
    <div class="wx-bot-margin"></div>

    <error-toast :message="message"></error-toast>
    <success-toast :message="message"></success-toast>
    <modal v-if="showModal" @ok="repay" @cancel="showModal=!showModal" title="确认还款" :desc="`将使用尾号为 ${maskedAccountNumber} 银行卡还款 ${subTotal} 元`" ok_text="确认"
           cancel_text="取消"></modal>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: 'repay',
    data() {
      return {
        waitingResponse: false,
        application: null,
        defaultBankAccount: null,
        message: '',
        showModal: false
      }
    },
    computed: {
      subTotal() {
        return this.application.loanInfo.amount + this.application.loanInfo.fee + this.application.loanInfo.gracePeriodCharge + this.application.loanInfo.overdueCharge
      },
      maskedAccountNumber() {
        let number = this.defaultBankAccount.accountNumber
        return number.substring(number.length - 4, number.length)
      }
    },
    methods: {
      ...mapActions(['showErrorToast','showSuccessToast']),
      confirmRepay() {
        if (!this.defaultBankAccount) {
          this.message = '请选择银行卡'
          this.showErrorToast()
          return
        }
        this.showModal = true
      },
      repay() {
        this.showModal = false
        if (!this.defaultBankAccount) {
          this.message = '请选择银行卡'
          this.showErrorToast()
          return
        }
        this.$http.post(`/api/public/user/${this.uid()}/loan/repay`,{
          appId: this.application.appId,
          repayAmount: this.subTotal,
          repayBankAccountNumber: this.defaultBankAccount.accountNumber
        })
          .then((response=>{
            this.message = "还款成功"
            this.showSuccessToast()
            this.application = response.data
          }))
          .catch((error) => {
            if (error.response.status === 409) {
              this.message = "请重新尝试"
            }else {
              this.message = "还款失败"
            }
            this.showErrorToast()
          })

      },
      formatRepayBankAccount() {
        if (this.defaultBankAccount && this.defaultBankAccount.accountNumber) {
          let number = this.defaultBankAccount.accountNumber
          return `尾号 ${number.substring(number.length - 4, number.length)}`
        } else {
          return '暂无'
        }
      }
    },
    created() {
      this.$http.get(`/api/public/user/${this.uid()}/loan/application/open`)
        .then((response => {
          this.application = response.data
        }))
      this.$http.get(`/api/public/user/${this.uid()}/profile/bank/default`)
        .then((response) => {
          this.defaultBankAccount = response.data
        })
    }
  }
</script>

<style scoped>
  .weui-cells {
    text-align: left;
  }

  .weui-cells__title {
    text-align: left;
  }
  .wx-bank-account-container{
    padding-top: 8vw;
  }
</style>
