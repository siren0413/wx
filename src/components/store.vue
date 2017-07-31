<template>
  <div>

    <div v-for="(amount, index) in loanAmounts">
      <input type="radio" id="level1" :value="index" v-on:change="updateServiceFee" v-model="currentAmountIndex"/>
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
              <option class="select-option" :value="index">{{ amount }} 元</option>
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
        <span class="weui-form-preview__value">{{ serviceFee }}</span>
      </div>
      <div class="weui-form-preview__item">
        <label class="weui-form-preview__label">应还金额</label>
        <span class="weui-form-preview__value">{{ loanAmounts[currentAmountIndex] + serviceFee }}</span>
      </div>
      <div class="weui-form-preview__item">
        <label class="weui-form-preview__label">还款日期</label>
        <span class="weui-form-preview__value">2017-09-13</span>
      </div>
    </div>


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
        serviceFee: null,
        currentAmountIndex: 0,
        currentTermIndex: 0
      }
    },
    computed: {
      ...mapState(['loanConfigs']),
      loanAmounts() {
        var arr = this.loanConfigs.map((elem, pos, arr) => {
          return elem.amount
        })
        return arr.filter((elem, pos, arr) => {
          return arr.indexOf(elem) === pos;
        })
      },
      loanTerms() {
        var terms = this.loanConfigs.filter((elem, pos, arr) => {
          return elem.amount === this.loanAmounts[this.currentAmountIndex]
        })
        return terms.map((elem, pos, arr) => {
          return elem.term
        })
      },
      updateServiceFee() {
        this.serviceFee = null
        this.$http.get('/api/v1/loan/servicefee', {
          params: {
            amount: this.loanAmounts[this.currentAmountIndex],
            term: this.loanTerms[this.currentTermIndex]
          }
        })
          .then((response) => {
            this.serviceFee = response.data.fee
          })
      }
    },
    methods: {
      ...mapActions(['getLoanConfigs']),
    },
    created() {
      this.getLoanConfigs()
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
