<template>
  <div>
    <div class="weui-cells__title">贷款相关</div>
    <div class="weui-cells weui-cells_form">
      <router-link to="/apply-status" class="weui-cell weui-cell_access">
        <img class="wx-img-apply-status" src="../assets/apply-status.png" />
        <div class="weui-cell__bd">查询进度</div>
        <div class="weui-cell__ft" style="font-size: 0">
          <!--<span style="vertical-align:middle; font-size: 17px;">当前状态</span>-->
        </div>
      </router-link>
      <div class="weui-cell weui-cell_access" @click="requestIncreaseCreditLimit">
        <img class="wx-img-increase-limit" src="../assets/increase-limit.png" />
        <div class="weui-cell__bd">申请提高额度</div>
        <div class="weui-cell__ft" style="font-size: 0">
          <span style="vertical-align:middle; font-size: 17px;">当前额度 <img src="../assets/rmb-red.png" style="vertical-align: middle; margin-bottom: 5px; height: 18px"/> {{currentCreditLimit}}</span>
        </div>
      </div>
      <div class="weui-cell ">
        <img class="wx-img-credit-score" src="../assets/credit-score.png" />
        <div class="weui-cell__bd">我的信用分</div>
        <div class="weui-cell__ft" style="font-size: 0">
          <span style="vertical-align:middle; font-size: 17px;">400 分</span>
        </div>
      </div>
    </div>


    <div class="weui-cells__title">个人账户</div>
    <div class="weui-cells weui-cells_form">
      <router-link to="/service-password" class="weui-cell weui-cell_access">
        <img class="wx-img-password" src="../assets/password.png" />
        <template v-if="passwordStatus === 0">
          <div class="weui-cell__bd">修改密码</div>
        </template>
        <template v-if="passwordStatus === 1">
          <div class="weui-cell__bd">设置密码</div>
        </template>
        <div class="weui-cell__ft" style="font-size: 0">
          <template v-if="passwordStatus === 0">
            <span style="vertical-align:middle; font-size: 17px;">已设置</span>
          </template>
          <template v-if="passwordStatus === 1">
            <span style="vertical-align:middle; font-size: 17px;">未设置</span>
            <span class="weui-badge weui-badge_dot" style="margin-left: 5px;margin-right: 5px;"></span>
          </template>
        </div>
      </router-link>
      <router-link to="/refer" class="weui-cell weui-cell_access">
        <img class="wx-img-refer" src="../assets/refer.png" />
        <div class="weui-cell__bd">好友推荐</div>
        <div class="weui-cell__ft" style="font-size: 0">
          <span style="vertical-align:middle; font-size: 17px;">推荐二维码</span>
        </div>
      </router-link>
      <div class="weui-cell weui-cell_access">
        <img class="wx-img-gift" src="../assets/gift.png" />
        <div class="weui-cell__bd">领取礼包</div>
        <div class="weui-cell__ft" style="font-size: 0">
          <span style="vertical-align:middle; font-size: 17px;"></span>
          <span class="weui-badge weui-badge_dot" style="margin-left: 5px;margin-right: 5px;"></span>
        </div>
      </div>
      <div class="weui-cell weui-cell_access" @click="logout">
        <img class="wx-img-logout" src="../assets/logout.png" />
        <div class="weui-cell__bd">登出</div>
        <div class="weui-cell__ft" style="font-size: 0">
          <span style="vertical-align:middle; font-size: 17px;"></span>
          <span class="weui-badge weui-badge_dot" style="margin-left: 5px;margin-right: 5px;"></span>
        </div>
      </div>
    </div>


    <div class="weui-cells__title">关于我们</div>
    <div class="weui-cells weui-cells_form">
      <router-link to="/customer-service" class="weui-cell weui-cell_access">
        <img class="wx-img-customer" src="../assets/customer-service.png" />
        <div class="weui-cell__bd">联系客服</div>
        <div class="weui-cell__ft" style="font-size: 0">
          <span style="vertical-align:middle; font-size: 17px;"></span>
        </div>
      </router-link>
      <router-link to="/faq" class="weui-cell weui-cell_access">
        <img class="wx-img-faq" src="../assets/faq.png" />
        <div class="weui-cell__bd">常见问题</div>
        <div class="weui-cell__ft" style="font-size: 0">
          <span style="vertical-align:middle; font-size: 17px;"></span>
        </div>
      </router-link>
      <div  class="weui-cell weui-cell_access">
        <img class="wx-img-app" src="../assets/app.png" />
        <div class="weui-cell__bd">下载手机 App</div>
        <div class="weui-cell__ft" style="font-size: 0">
          <span style="vertical-align:middle; font-size: 17px;"></span>
        </div>
      </div>
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

    <loading-toast></loading-toast>

    <div class="wx-bot-margin"></div>

  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import tabbar from "./tabbar.vue";
  import router from '../router'

  export default {
    components: {tabbar},
    name: 'store',
    data() {
      return {
        currentCreditLimit: null,
        showIncreaseCreditLimitDialog: false,
        passwordStatus: null,
        increaseCreditLimitResponse: {}
      }
    },
    computed: {},
    methods: {
      ...mapActions(['incLoadingCount', 'decLoadingCount']),
      requestIncreaseCreditLimit() {
        this.incLoadingCount()
        this.$http.get('/api/v1/loan/credit/limit/increase')
          .then((response) => {
            this.increaseCreditLimitResponse = response.data
            this.showIncreaseCreditLimitDialog = true
            this.decLoadingCount()
          })
          .catch((error) => {
            this.decLoadingCount()
          })
      },
      logout() {
        localStorage.removeItem('accessToken')
        router.push('/login')
      }
    },
    created() {
      this.incLoadingCount()
      this.$http.get('/api/v1/loan/credit/limit')
        .then((response) => {
          this.currentCreditLimit = response.data.limit
          this.decLoadingCount()
        })
        .catch((response) => {
          this.decLoadingCount()
        })
      this.incLoadingCount()
      this.$http.get('/api/v1/user/password/status')
        .then((response) => {
          this.passwordStatus = response.data.status
          this.decLoadingCount()
        })
        .catch((error) => {
          this.decLoadingCount()
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

  .wx-img-apply-status, .wx-img-increase-limit  {
    height: 16px;
    width: 16px;
    padding-right: 8px;
    padding-bottom: 2px;
  }
  .wx-img-credit-score, .wx-img-app {
    height: 20px;
    width: 20px;
    padding-right: 5px;
    padding-bottom: 2px;
  }
  .wx-img-password, .wx-img-logout, .wx-img-customer, .wx-img-faq, .wx-img-gift {
    height: 18px;
    width: 18px;
    padding-right: 5px;
    padding-bottom: 2px;
  }
  .wx-img-refer {
    height: 16px;
    width: 16px;
    padding-right: 7px;
    padding-bottom: 2px;
  }

</style>
