<template>
  <div>

    <div>
      <input type="radio" id="level1" value="level1" v-model="currentLevel"/>
      <label>{{ loanLevels.level1 }}</label>
    </div>
    <div>
      <input type="radio" id="level2" value="level2" v-model="currentLevel"/>
      <label>{{ loanLevels.level2 }}</label>
    </div>
    <div>
      <input type="radio" id="level3" value="level3" v-model="currentLevel"/>
      <label>{{ loanLevels.level3 }}</label>
    </div>

    <div class="weui-cells">

      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label for="" class="weui-label">借款金额</label>
        </div>
        <div class="weui-cell__bd">
          <select class="weui-select" dir="rtl" name="select1" v-model="currentLevel">
            <option value="level1" dir="ltr">{{ loanLevels.level1 }} 元</option>
            <option value="level2" dir="ltr">{{ loanLevels.level2 }} 元</option>
            <option value="level3" dir="ltr">{{ loanLevels.level3 }} 元</option>
          </select>
        </div>
      </div>

      <div class="weui-cell weui-cell_select weui-cell_select-after">
        <div class="weui-cell__hd">
          <label for="" class="weui-label">借款天数</label>
        </div>
        <div class="weui-cell__bd">
          <select class="weui-select" dir="rtl" name="select1" v-model="currentDuration">
            <option value="option1" dir="ltr">{{ loanDurations.option1 }} 天</option>
            <option value="option2" dir="ltr">{{ loanDurations.option2 }} 天</option>
          </select>
        </div>
        <div></div>
      </div>

    </div>

    <div class="info-box">
      <i class="weui-icon-info">
      </i>
      <span class="weui-media-box__desc">完善个人资料会帮助提升借款额度</span>
    </div>


    <div class="weui-form-preview__bd">
      <div class="weui-form-preview__item">
        <label class="weui-form-preview__label">服务费用</label>
        <span class="weui-form-preview__value">{{ loanLevels[currentLevel] }}</span>
      </div>
      <div class="weui-form-preview__item">
        <label class="weui-form-preview__label">应还金额</label>
        <span class="weui-form-preview__value">名字名字名字</span>
      </div>
      <div class="weui-form-preview__item">
        <label class="weui-form-preview__label">还款日期</label>
        <span class="weui-form-preview__value">很长很长的名字很长很长的名字很长很长的名字很长很长的名字很长很长的名字</span>
      </div>
    </div>


  </div>

</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  import tabbar from "./tabbar.vue";

  export default {
    components: {tabbar},
    name: 'store',
    data() {
      return {
        loanLevels: {
          level1: 500,
          level2: 1000,
          level3: 1500
        },
        loanDurations: {
          option1: 7,
          option2: 14
        },
        currentLevel: 'level1',
        currentDuration: 'option2'
      }
    },
    computed: {},
    methods: {}
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
  .info-box{
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

</style>
