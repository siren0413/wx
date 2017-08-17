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
              class="weui-form-preview__value">¥ {{ application.loanInfo.amount + application.loanInfo.fee + application.loanInfo.gracePeriodCharge + application.loanInfo.overdueCharge}}</em>
          </div>
        </div>
      </div>

      <div class="weui-cells__title">选择银行卡</div>
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


      <div class="weui-btn-area" @click="repay">
        <a class="weui-btn weui-btn_primary" :class="[{'weui-btn_loading': waitingResponse}]">
          <i v-if="waitingResponse" class="weui-loading"></i>确认还款</a>
      </div>

    </template>

    <template v-else>
      <div>
        <img src="../assets/service/empty.png" style="height: 100px; margin-top: 30%"/>
        <div style="margin-top: 20px; font-size: 16px">
          <p>暂无记录</p>
        </div>
      </div>
    </template>

  </div>
</template>

<script>
  export default {
    name: 'repay',
    data() {
      return {
        waitingResponse: false,
        application: null,
        defaultBankAccount: null
      }
    },
    computed: {},
    methods: {
      repay() {

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
</style>
