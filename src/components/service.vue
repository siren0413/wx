<template>
  <div>
    <div class="weui-cells__title">贷款相关</div>
    <div class="weui-cells weui-cells_form">
      <router-link to="/apply-status" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">查询进度</div>
        <div class="weui-cell__ft" style="font-size: 0">
          <!--<span style="vertical-align:middle; font-size: 17px;">当前状态</span>-->
        </div>
      </router-link>
      <div class="weui-cell weui-cell_access" @click="requestIncreaseCreditLimit">
        <div class="weui-cell__bd">申请提高额度</div>
        <div class="weui-cell__ft" style="font-size: 0">
          <span style="vertical-align:middle; font-size: 17px;">当前额度 <img src="../assets/rmb-red.png"
                                                                          style="vertical-align: middle; margin-bottom: 5px; height: 18px"/> {{currentCreditLimit}}</span>
        </div>
      </div>
      <div class="weui-cell ">
        <div class="weui-cell__bd">我的信用分</div>
        <div class="weui-cell__ft" style="font-size: 0">
          <span style="vertical-align:middle; font-size: 17px;">400 分</span>
        </div>
      </div>
    </div>


    <div class="weui-cells__title">个人账户</div>
    <div class="weui-cells weui-cells_form">
      <router-link to="/profile-id" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">设置密码</div>
        <div class="weui-cell__ft" style="font-size: 0">
          <span style="vertical-align:middle; font-size: 17px;">未设置</span>
        </div>
      </router-link>
      <!--<router-link to="/profile-id" class="weui-cell weui-cell_access">-->
        <!--<div class="weui-cell__bd">好友推荐</div>-->
        <!--<div class="weui-cell__ft" style="font-size: 0">-->
          <!--<span style="vertical-align:middle; font-size: 17px;">获取推荐链接</span>-->
        <!--</div>-->
      <!--</router-link>-->
      <router-link to="/profile-id" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">领取礼包</div>
        <div class="weui-cell__ft" style="font-size: 0">
          <span style="vertical-align:middle; font-size: 17px;"></span>
          <span class="weui-badge weui-badge_dot" style="margin-left: 5px;margin-right: 5px;"></span>
        </div>
      </router-link>
    </div>


    <div class="weui-cells__title">关于我们</div>
    <div class="weui-cells weui-cells_form">
      <router-link to="/profile-id" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">联系客服</div>
        <div class="weui-cell__ft" style="font-size: 0">
          <span style="vertical-align:middle; font-size: 17px;"></span>
        </div>
      </router-link>
      <router-link to="/profile-id" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">常见问题</div>
        <div class="weui-cell__ft" style="font-size: 0">
          <span style="vertical-align:middle; font-size: 17px;"></span>
        </div>
      </router-link>
      <router-link to="/profile-id" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">下载手机 App</div>
        <div class="weui-cell__ft" style="font-size: 0">
          <span style="vertical-align:middle; font-size: 17px;"></span>
        </div>
      </router-link>
    </div>

    <div :style="showIncreaseCreditLimitDialog? 'display: block;': 'display:none'">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{increaseCreditLimitResponse.title}}</strong></div>
        <div class="weui-dialog__bd">{{increaseCreditLimitResponse.desc}}</div>
        <div class="weui-dialog__ft">
          <a href="javascript:;" @click="showIncreaseCreditLimitDialog = false" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>
        </div>
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
    name: 'store',
    data() {
      return {
        currentCreditLimit: null,
        showIncreaseCreditLimitDialog: false,
        increaseCreditLimitResponse: {}
      }
    },
    computed: {},
    methods: {
      requestIncreaseCreditLimit() {
        this.$http.get('/api/v1/loan/credit/limit/increase')
          .then((response) => {
            this.increaseCreditLimitResponse = response.data
            this.showIncreaseCreditLimitDialog = true
          })
      }
    },
    created() {
      this.$http.get('/api/v1/loan/credit/limit')
        .then((response) => {
          this.currentCreditLimit = response.data.limit
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
  }

  .weui-mask {
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .2s ease;
  }
</style>
