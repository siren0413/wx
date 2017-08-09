<template>
  <div>
    <div class="wx-faq-container">
      <div>
        <span class="weui-dialog__title">审核需要等待多久?</span>
        <p class="weui-cells__title">如果您的信用记录良好，通常审核会在一小时内完成。请尽量保证所填个人信息准备无误以提高审核速度。</p>
      </div>

      <div class="wx-space"></div>
      <div>
        <span class="weui-dialog__title">老用户审核会比新用户快吗？</span>
        <p class="weui-cells__title">是的，老用户的审核速度会明显快于新用户，并且如果您有良好的还款记录，那么审核时间只需几分钟。</p>
      </div>

      <div class="wx-space"></div>
      <div>
        <span class="weui-dialog__title">24小时都会审核吗？</span>
        <p class="weui-cells__title">是的，24小时都会审核，晚上和白天的审核速度是一样的。</p>
      </div>

      <div class="wx-space"></div>
      <div>
        <span class="weui-dialog__title">放款需要多久？</span>
        <p class="weui-cells__title">通过审核并且绑定收款银行卡的用户，一般会在 2 小时内收到款项，最晚会在当天晚上12点前到账。如果超过一天没有收到放款，请联系微信客服。</p>
      </div>


      <div class="wx-space"></div>
      <div>
        <span class="weui-dialog__title">为何申请会被拒绝？</span>
        <p class="weui-cells__title">一些用户由于信用记录还没有达到我们的要求所以无法通过申请，但我们所有的数据都经过严格加密和保护，被拒用户可以在被拒7天后再次尝试申请。</p>
      </div>

      <div class="wx-space"></div>
      <div>
        <span class="weui-dialog__title">审核期间会打申请人或联系人电话吗？</span>
        <p class="weui-cells__title">不会。</p>
      </div>

      <div class="wx-space"></div>
      <div>
        <span class="weui-dialog__title">注册收不到验证码？</span>
        <p class="weui-cells__title">尝试更换网络环境，或者关闭重新打开公众号后再次尝试。另外如果一小时内多次点击验证码发送，也会收不到验证码。</p>
      </div>

      <div class="wx-space"></div>
      <div>
        <span class="weui-dialog__title">手机运营商验证总是失败？</span>
        <p class="weui-cells__title">请确保您是在验证您本人实名认证过的手机，如果已经忘记查询密码，请先充值查询密码。</p>
      </div>

      <div class="wx-space"></div>
      <div>
        <span class="weui-dialog__title">还款后能否马上再次借款？</span>
        <p class="weui-cells__title">可以。</p>
      </div>

      <div class="wx-space"></div>
      <div>
        <span class="weui-dialog__title">如果修改银行卡？</span>
        <p class="weui-cells__title">在审核中的用户不允许修改银行卡。审核通过的用户可以进行绑卡和换卡。</p>
      </div>

      <div class="wx-space"></div>
      <div>
        <span class="weui-dialog__title">如何还款？</span>
        <p class="weui-cells__title">1. 到期扣款: 我们会在到期日从您绑定的银行卡中扣款，请保证卡有足够余额，避免产生额外的逾期费和影响个人信用。</p>
        <p class="weui-cells__title">2. 提前还款: 请点击 "我要还款" 后根据提示操作，提前还款会增加个人信用。</p>
      </div>

      <div class="wx-space"></div>
      <div>
        <span class="weui-dialog__title">我卡里有钱，可总是还款失败</span>
        <p class="weui-cells__title">请查看您绑定的银行卡里的余额是否充足，或者是否已经达到每日交易限额。如果都不是请联系我们的客服。</p>
      </div>

    </div>

    <div class="wx-bot-margin"></div>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  import tabbar from "./tabbar.vue";

  export default {
    components: {tabbar},
    name: 'faq',
    data() {
      return {}
    },
    computed: {},
    methods: {}
  }
</script>

<style scoped>
  .wx-faq-container {
    text-align: left;
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 30px;
  }

  .weui-dialog__title {
    padding-left: 15px;
    font-weight: 500;
    font-size: 16px;
    color: #586c94;
  }
  .wx-space{
    padding-top: 15px;
    padding-bottom: 15px;
  }

</style>
