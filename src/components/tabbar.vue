<template>
  <div class="weui-tabbar">
    <router-link to="/store" class="weui-tabbar__item"
                 :class="[computeCurrentTab === '/store' ? 'weui-bar__item_on': 'weui-bar__item_off']">
      <div class="wx-tab">
                    <span style="display: inline-block;position: relative;">
                      <img src="../assets/money-bag.png" class="weui-tabbar__icon"
                           title="Money Bag Yen" width="30" height="30">
                      <!--<img src="../assets/icon_tabbar.png" alt="" class="weui-tabbar__icon">-->
                      <!--<span class="weui-badge" style="position: absolute;top: -2px;right: -13px;">8</span>-->
                    </span>
        <p class="weui-tabbar__label">我要借款</p>
      </div>
    </router-link>

    <router-link to="/repay" class="weui-tabbar__item"
                 :class="[computeCurrentTab === '/repay' ? 'weui-bar__item_on': 'weui-bar__item_off']">
      <div class="wx-tab">
        <img src="../assets/repay.png" alt="" class="weui-tabbar__icon">
        <p class="weui-tabbar__label">我要还款</p>
      </div>
    </router-link>

    <router-link to="/profile" class="weui-tabbar__item"
                 :class="[computeCurrentTab === '/profile' ? 'weui-bar__item_on': 'weui-bar__item_off']">
      <div class="wx-tab">
                    <span style="display: inline-block;position: relative;">
                        <img src="../assets/personal-info.png" alt="" class="weui-tabbar__icon">
                        <span class="weui-badge weui-badge_dot" style="position: absolute;top: 0;right: -6px;"></span>
                    </span>
        <p class="weui-tabbar__label">个人信息</p>
      </div>
    </router-link>

    <router-link to="/service" class="weui-tabbar__item"
                 :class="[computeCurrentTab === '/service' ? 'weui-bar__item_on': 'weui-bar__item_off']">
      <div class="wx-tab">
        <img src="../assets/service.png" alt="" class="weui-tabbar__icon">
        <p class="weui-tabbar__label">服务台</p>
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'tabbar',
    data() {
      return {}
    },
    computed: {
      computeCurrentTab() {
        return this.$route.path
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .wx-tab {
    /*position: relative;*/
    /*top: 50%;*/
    /*height: 50%;*/
    /*margin-top: -25%;*/
    /*text-align: center;*/
    /*position: relative;*/
    /*top: 50%;*/
    /*transform: translateY(-50%);*/
    /*vertical-align: middle;*/
  }

  .weui-tabbar__item {
    padding-top: 8px;
  }

  .weui-bar__item_off {
    opacity: 0.5;
  }
</style>
