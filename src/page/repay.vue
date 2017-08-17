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

      <div class="weui-cells__title">还款方式</div>


      <div class="weui-btn-area" @click="repay">
        <a class="weui-btn weui-btn_primary" :class="[{'weui-btn_loading': waitingResponse}]">
          <i v-if="waitingResponse" class="weui-loading"></i>确认还款</a>
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
        application: null
      }
    },
    computed: {},
    methods: {
      repay() {

      }
    },
    created() {
      this.$http.get(`/api/public/user/${this.uid()}/loan/application/open`)
        .then((response => {
          this.application = response.data
        }))

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
