<template>
  <div>
    <!--<div v-for="(amount, index) in loanAmounts">-->
    <!--<input type="radio" id="level1" :value="index" v-model="currentAmountIndex"/>-->
    <!--<div class="square">-->
    <!--<span class="square-span">50</span>-->
    <!--</div>-->
    <!--<label>{{ amount }}</label>-->
    <!--</div>-->

    <div class="wx-square-box">
      <div class="wx-square-container">
        <div class="wx-square" style="background: rgba(243, 202, 126, 0.25); color: rgba(115, 71, 41, 0.7);" :class="{'wx-square-select-orange':currentAmountIndex===0}" @click="currentAmountIndex=0">
          <span class="wx-square-span">500</span>
          <span class="wx-square-span wx-square-span-small" >元</span>
        </div>
        <div class="wx-square" style="background: rgba(158, 181, 215, 0.25); color: rgba(53, 70, 119, 0.8);" :class="{'wx-square-select-blue':currentAmountIndex===1}" @click="currentAmountIndex=1">
          <span class="wx-square-span">1000</span>
          <span class="wx-square-span wx-square-span-small" >元</span>
        </div>
        <div class="wx-square" style="background: rgba(192, 172, 205, 0.25); color: rgba(87, 47, 109, 0.8);" :class="{'wx-square-select-purple':currentAmountIndex===2}" @click="currentAmountIndex=2">
          <span class="wx-square-span">1500</span>
          <span class="wx-square-span wx-square-span-small" >元</span>
        </div>
      </div>
    </div>


    <div class="weui-cells">

      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <img src="../assets/home/rmb-red.png" class="wx-amount-img"/>
        <div class="weui-cell__hd">
          <label for="" class="weui-label">借款金额</label>
        </div>
        <div class="weui-cell__bd wx-amount-cell">
          <select id="loan-amount" class="weui-select wx-amount-select" name="select1" v-model="currentAmountIndex">
            <template v-for="(amount, index) in loanAmounts">
              <option class="select-option" :value="index"> {{ amount }} 元</option>
            </template>
          </select>
        </div>
      </div>

      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <img src="../assets/home/loan-term.png" class="wx-term-img"/>
        <div class="weui-cell__hd">
          <label for="" class="weui-label">借款天数</label>
        </div>
        <div class="weui-cell__bd">
          <select class="weui-select wx-term-select" name="select2" v-model="currentTermIndex">
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
        <span v-else class="weui-form-preview__value"><img src="../assets/home/rmb-gray.png" class="wx-subtotal-img">{{ serviceFee }} 元</span>
      </div>
      <div class="weui-form-preview__item">
        <label class="weui-form-preview__label">应还金额</label>
        <i v-if="subTotal === null" class="weui-loading"></i>
        <span v-else class="weui-form-preview__value"><img src="../assets/home/rmb-gray.png" class="wx-subtotal-img">{{ subTotal }} 元</span>
      </div>
      <div class="weui-form-preview__item">
        <label class="weui-form-preview__label">还款日期</label>
        <span class="weui-form-preview__value">{{ computeDeadline }}</span>
      </div>
    </div>

    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" @click="apply">开始申请</a>
    </div>

    <loading-toast></loading-toast>
    <error-toast :message="errorMessage"></error-toast>
    <modal v-if="showModal" @ok="toApplyStatus" @cancel="showModal=!showModal" title="申请失败" desc="您已经有正在审核的申请，您可以前往查看审核进度" ok_text="查看进度"
           cancel_text="取消"></modal>
    <div class="wx-bot-margin"></div>

  </div>

</template>

<script>
  import {mapMutations, mapActions, mapState} from 'vuex'
  import router from '../router';

  export default {
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
        showModal: false,
        errorMessage: null
      }
    },
    computed: {
      ...mapState(['applicationInfo']),
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
      ...mapActions(['showErrorToast']),
      apply() {
        this.applicationInfo.amount = this.loanAmounts[this.currentAmountIndex]
        this.applicationInfo.term = this.loanTerms[this.currentTermIndex]
        this.applicationInfo.fee = this.serviceFee
        this.applicationInfo.expire = this.computeDeadline

        this.$http.get(`/api/public/user/${this.uid()}/loan/application/pending/exist`)
          .then((response) => {
            if (response.data.result === true) {
              this.showModal = true
            } else {
              router.push('/application-summary')
            }
          }).catch((error) => {
            this.errorMessage = "请稍后再试"
            this.showErrorToast()
          })
      },
      updateServiceFee() {
        this.serviceFee = null
        this.subTotal = null

        let config = this.serviceFee = this.loanConfigs.find((elem, pos, arr) => {
          return elem.amount === this.loanAmounts[this.currentAmountIndex] && elem.term === this.loanTerms[this.currentTermIndex]
        })
        this.serviceFee = config.fee
        this.subTotal = this.serviceFee + this.loanAmounts[this.currentAmountIndex]
      },
      toApplyStatus() {
        router.push('/apply-status')
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
      this.$http.get(`/api/public/user/${this.uid()}/loan/configs`)
        .then((response) => {
          this.loanConfigs = response.data
        })
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
    width: 100px;
  }

  .wx-amount-img, .wx-term-img {
    height: 19px;
    vertical-align: middle;
    position: relative;
    /*right: 73px;*/
    /*top: 28%*/
    padding-left: 20px;
    padding-right: 6px;
  }

  .wx-term-select {
    padding-right: 28px;
  }

  .wx-subtotal-img {
    height: 14px;
    padding-right: 5px;
    vertical-align: middle;
    margin-top: -5px;
  }

  .weui-label {
    text-align: left;
  }

  .wx-square {
    /*float: left;*/
    display: inline-block;
    position: relative;
    width: 28vw;
    height: 23vw;
    /*margin-bottom: 30px;*/
    /*background-size: cover; !* you change this to "contain" if you don't want the images to be cropped *!*/
    border-radius: 8%;
    /*opacity: 1;*/
    background: rgba(243, 202, 126, 0.3);
    vertical-align: middle;
    text-align: center;
    margin-right: 8px;
    color: #515151;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
  }

  .wx-square-span {
    display: inline-block;
    vertical-align: middle;
    /*line-height: 100px;*/
    font-weight: 300;
    font-size: 8vw;
    margin-top: 5.5vw;
  }
  .wx-square-span-small {
    font-size: 3vw;
    font-weight: 400;
    margin-top: 8vw;
    margin-left: -1vw;
  }
  .wx-square-container {
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 8vw;
    overflow-x: auto;
    white-space: nowrap;
    height: 32vw;
  }

  .wx-square-container::-webkit-scrollbar {
    display: none;
  }

  .wx-square-select-orange{
    width: 30vw;
    height: 25vw;
    /*border: 0.3vw solid rgba(243, 202, 126, 0.5);*/
  }
  .wx-square-select-blue{
    width: 30vw;
    height: 25vw;
    /*border: 0.3vw solid rgba(158, 181, 215, 0.4);*/
  }
  .wx-square-select-purple{
    width: 30vw;
    height: 25vw;
    /*border: 0.3vw solid rgba(192, 172, 205, 0.4);*/
  }

</style>
