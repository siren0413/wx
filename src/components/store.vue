<template>
  <div>
    <p class="weui-msg__title wx-page-title">我要借款</p>

    <div v-for="(amount, index) in loanAmounts">
      <input type="radio" id="level1" :value="index" v-model="currentAmountIndex"/>
      <label>{{ amount }}</label>
    </div>

    <div class="weui-cells">

      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label for="" class="weui-label">借款金额</label>
        </div>
        <div class="weui-cell__bd">
          <select class="weui-select" name="select1" v-model="currentAmountIndex">
            <template v-for="(amount, index) in loanAmounts">
              <option class="select-option" :value="index">¥ {{ amount }} 元</option>
            </template>
          </select>
        </div>
      </div>

      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label for="" class="weui-label">借款天数</label>
        </div>
        <div class="weui-cell__bd">
          <select class="weui-select" name="select2" v-model="currentTermIndex">
            <template v-for="(term, index) in loanTerms">
              <option :value="index">{{ term }} 天</option>
            </template>
          </select>
        </div>
        <div></div>
      </div>

    </div>

    <div class="info-box">
      <i class="weui-icon-info">
      </i>
      <span class="weui-media-box__desc">完善个人资料将会提升借款额度</span>
    </div>


    <div class="weui-form-preview__bd">
      <div class="weui-form-preview__item">
        <label class="weui-form-preview__label">服务费用</label>
        <i v-if="serviceFee === null" class="weui-loading"></i>
        <span v-else class="weui-form-preview__value">¥ {{ serviceFee }} 元</span>
      </div>
      <div class="weui-form-preview__item">
        <label class="weui-form-preview__label">应还金额</label>
        <i v-if="subTotal === null" class="weui-loading"></i>
        <span v-else class="weui-form-preview__value">¥ {{ subTotal }} 元</span>
      </div>
      <div class="weui-form-preview__item">
        <label class="weui-form-preview__label">还款日期</label>
        <span class="weui-form-preview__value">{{ computeDeadline }}</span>
      </div>
    </div>

    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" @click="apply">开始申请</a>
    </div>

    <modal v-if="showModal" @cancel="showModal = false">
    </modal>

    <div class="wx-bot-margin"></div>

  </div>

</template>

<script>
  import {mapMutations, mapActions, mapState} from 'vuex'
  import tabbar from "./tabbar.vue";

  export default {
    components: {tabbar},
    name: 'store',
    data() {
      return {
        loanConfigs: [],
        serviceFee: null,
        subTotal: null,
        loanAmounts: [],
        loanTerms: [],
        currentAmountIndex: 0,
        currentTermIndex: 0,
        showModal: false
      }
    },
    computed: {
      computeDeadline() {
        let deadline = new Date();
        deadline.setDate(deadline.getDate() + this.loanTerms[this.currentTermIndex])
        let dd = deadline.getDate();
        let mm = deadline.getMonth() + 1;
        let yy = deadline.getFullYear();
        return yy + '年' + mm + '月' + dd + '日'
      }
    },
    methods: {
      apply() {
        this.showModal = true;
      },
      updateServiceFee() {
        this.serviceFee = null
        this.subTotal = null
        this.$http.get('/api/v1/loan/servicefee', {
          params: {
            amount: this.loanAmounts[this.currentAmountIndex],
            term: this.loanTerms[this.currentTermIndex]
          }
        })
          .then((response) => {
            this.serviceFee = response.data.fee
            this.subTotal = this.serviceFee + this.loanAmounts[this.currentAmountIndex]
          })
      }
    },
    watch: {
      loanConfigs: function (updated, old) {
        this.loanAmounts = updated.map((elem, pos, arr) => {
          return elem.amount
        }).filter((elem, pos, arr) => {
          return arr.indexOf(elem) === pos;
        })
        this.loanTerms = updated.filter((elem, pos, arr) => {
          return elem.amount === this.loanAmounts[this.currentAmountIndex]
        }).map((elem, pos, arr) => {
          return elem.term
        })
        this.currentTermIndex = this.loanTerms.length - 1
        this.updateServiceFee()
      },
      currentAmountIndex: function () {
        this.updateServiceFee()
      },
      currentTermIndex: function () {
        this.updateServiceFee()
      }
    },
    created() {
      this.$http.get('/api/v1/loan/configs')
        .then(function (response) {
          this.loanConfigs = response.data
        }.bind(this))
    }
  }
</script>

<style scoped>
  .weui-cell__bd {
    text-align: right;
  }

  .weui-cell_select-after {
    padding-left: 0px;
  }

  .weui-form-preview__bd {
    margin-top: 50px;
    padding-left: 20px;
  }

  /* info box */
  .info-box {
    text-align: left;
    vertical-align: middle;
    padding-left: 16px;
    margin-top: 10px;
  }

  .weui-icon-info {
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
  }

  .weui-media-box__desc {
    display: inline-block;
    vertical-align: middle;
  }

  .weui-select {
    text-align-last: right;
    width: 50%;
  }

</style>
