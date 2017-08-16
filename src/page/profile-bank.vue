<template>
  <div>

    <div class="weui-cells__title">收款银行卡</div>
    <div class="weui-cells weui-cells_radio">
      <label class="weui-cell weui-check__label" for="x11">
        <div class="weui-cell__bd">
          <p>还款银行卡</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" class="weui-check" name="radio1" id="x11">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
      <label class="weui-cell weui-check__label" for="x12">

        <div class="weui-cell__bd">
          <p>cell standard</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" name="radio1" class="weui-check" id="x12" checked="checked">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
    </div>


    <div class="weui-cells__title">还款银行卡</div>
    <div class="weui-cells weui-cells_radio">
      <label class="weui-cell weui-check__label" for="x11">
        <div class="weui-cell__bd">
          <p>还款银行卡</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" class="weui-check" name="radio1" id="x11">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
      <label class="weui-cell weui-check__label" for="x12">

        <div class="weui-cell__bd">
          <p>cell standard</p>
        </div>
        <div class="weui-cell__ft">
          <input type="radio" name="radio1" class="weui-check" id="x12" checked="checked">
          <span class="weui-icon-checked"></span>
        </div>
      </label>
    </div>

    <div class="weui-cells">
      <a class="weui-cell weui-cell_access" href="javascript:;">
        <div class="weui-cell__bd">
          <p>添加银行卡</p>
        </div>
        <div class="weui-cell__ft">
        </div>
      </a>
      <a class="weui-cell weui-cell_access" href="javascript:;">
        <div class="weui-cell__bd">
          <p>删除银行卡</p>
        </div>
        <div class="weui-cell__ft">
        </div>
      </a>
    </div>

    <div class="weui-btn-area" @click="repay">
      <a class="weui-btn weui-btn_primary" :class="[{'weui-btn_loading': waitingResponse}]">
        <i v-if="waitingResponse" class="weui-loading"></i>保存</a>
    </div>

  </div>
</template>

<script>

  export default {
    name: 'profile-bank',
    data() {
      return {
        waitingResponse:false
      }
    },
    computed: {},
    methods: {}
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
