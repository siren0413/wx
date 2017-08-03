<template>
  <div>
    <p class="weui-msg__title wx-page-title">服务台</p>

    <div class="weui-cells__title">贷款相关</div>
    <div class="weui-cells weui-cells_form">
      <router-link to="/profile-id" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">查询进度</div>
        <div class="weui-cell__ft" style="font-size: 0">
          <span style="vertical-align:middle; font-size: 17px;">当前状态</span>
        </div>
      </router-link>
      <router-link to="/profile-id" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">申请提高额度</div>
        <div class="weui-cell__ft" style="font-size: 0">
          <span style="vertical-align:middle; font-size: 17px;">当前额度</span>
        </div>
      </router-link>
      <router-link to="/profile-id" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">我的信用分</div>
        <div class="weui-cell__ft" style="font-size: 0">
          <span style="vertical-align:middle; font-size: 17px;">400</span>
        </div>
      </router-link>
    </div>


    <div class="weui-cells__title">个人账户</div>
    <div class="weui-cells weui-cells_form">
      <router-link to="/profile-id" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">设置密码</div>
        <div class="weui-cell__ft" style="font-size: 0">
          <span style="vertical-align:middle; font-size: 17px;">未设置</span>
        </div>
      </router-link>
      <router-link to="/profile-id" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">好友推荐</div>
        <div class="weui-cell__ft" style="font-size: 0">
          <span style="vertical-align:middle; font-size: 17px;">获取推荐链接</span>
        </div>
      </router-link>
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


  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  import tabbar from "./tabbar.vue";

  export default {
    components: {tabbar},
    name: 'store',
    data() {
      return {}
    },
    computed: {},
    methods: {}
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
</style>
