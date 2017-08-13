<template>
  <div class="weui-tabbar">
    <router-link to="/home" class="weui-tabbar__item"
                 :class="[computeCurrentTab === '/home' ? 'weui-bar__item_on': 'weui-bar__item_off']">
      <div class="wx-tab">
                    <span style="display: inline-block;position: relative;">

                      <template v-if="computeCurrentTab === '/home'">
                      <img src="../assets/tab/money-bag.png" class="weui-tabbar__icon" style="height: 28px; width: 28px" title="Money Bag Yen" >
                        </template>
                      <template v-else>
                      <img src="../assets/tab/money-bag_off.png" class="weui-tabbar__icon" style="height: 28px; width: 28px"  title="Money Bag Yen" >
                      </template>
                      <!--<img src="../assets/icon_tabbar.png" alt="" class="weui-tabbar__icon">-->
                      <!--<span class="weui-badge" style="position: absolute;top: -2px;right: -13px;">8</span>-->
                    </span>
        <p class="weui-tabbar__label" :style="computeCurrentTab === '/home' ? 'color: #e98f36': ''">我要借款</p>
      </div>
    </router-link>

    <router-link to="/repay" class="weui-tabbar__item"
                 :class="[computeCurrentTab === '/repay' ? 'weui-bar__item_on': 'weui-bar__item_off']">
      <div class="wx-tab">
        <template v-if="computeCurrentTab === '/repay'">
          <img src="../assets/tab/repay.png" alt="" class="weui-tabbar__icon">
        </template>
        <template v-else>
          <img src="../assets/tab/repay_off.png" alt="" class="weui-tabbar__icon">
        </template>
        <p class="weui-tabbar__label" :style="computeCurrentTab === '/repay' ? 'color: #87a7d6': ''">我要还款</p>
      </div>
    </router-link>

    <router-link to="/profile" class="weui-tabbar__item"
                 :class="[computeCurrentTab === '/profile' ? 'weui-bar__item_on': 'weui-bar__item_off']">
      <div class="wx-tab">
                    <span style="display: inline-block;position: relative;">

                      <template v-if="computeCurrentTab === '/profile'">
                        <img src="../assets/tab/personal-info.png" alt="" class="weui-tabbar__icon">
                        <!--<span class="weui-badge weui-badge_dot" style="position: absolute;top: 0;right: -6px;"></span>-->
                        </template>
                      <template v-else>
                        <img src="../assets/tab/personal-info_off.png" alt="" class="weui-tabbar__icon">
                      </template>
                    </span>
        <p class="weui-tabbar__label" :style="computeCurrentTab === '/profile' ? 'color: #1aaba8': ''">个人信息</p>
      </div>
    </router-link>

    <router-link to="/service" class="weui-tabbar__item"
                 :class="[computeCurrentTab === '/service' ? 'weui-bar__item_on': 'weui-bar__item_off']">
      <div class="wx-tab">
        <template v-if="computeCurrentTab=== '/service'">
          <img src="../assets/tab/service.png" alt="" class="weui-tabbar__icon">
        </template>
        <template v-else>
          <img src="../assets/tab/service_off.png" alt="" class="weui-tabbar__icon">
        </template>
        <p class="weui-tabbar__label" :style="computeCurrentTab === '/service' ? 'color: #be8dbd': ''">服务台</p>
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
