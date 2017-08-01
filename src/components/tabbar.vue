<template>
  <div>
    <div class="weui-tabbar">

      <router-link to="/store" class="weui-tabbar__item"
                   :class="{'weui-bar__item_on': computeCurrentTab === '/store'}">
                    <span style="display: inline-block;position: relative;">
                        <img src="../assets/icon_tabbar.png" alt="" class="weui-tabbar__icon">
                        <span class="weui-badge" style="position: absolute;top: -2px;right: -13px;">8</span>
                    </span>
        <p class="weui-tabbar__label">我要借款</p>
      </router-link>

      <router-link to="/repay" class="weui-tabbar__item"
                   :class="{'weui-bar__item_on': computeCurrentTab === '/repay'}">
        <img src="../assets/icon_tabbar.png" alt="" class="weui-tabbar__icon">
        <p class="weui-tabbar__label">我要还款</p>
      </router-link>

      <router-link to="/profile" class="weui-tabbar__item"
                   :class="{'weui-bar__item_on': computeCurrentTab === '/profile'}">
                    <span style="display: inline-block;position: relative;">
                        <img src="../assets/icon_tabbar.png" alt="" class="weui-tabbar__icon">
                        <span class="weui-badge weui-badge_dot" style="position: absolute;top: 0;right: -6px;"></span>
                    </span>
        <p class="weui-tabbar__label">个人信息</p>
      </router-link>

      <router-link to="/service" class="weui-tabbar__item"
                   :class="{'weui-bar__item_on': computeCurrentTab === '/service'}">
        <img src="../assets/icon_tabbar.png" alt="" class="weui-tabbar__icon">
        <p class="weui-tabbar__label">服务台</p>
      </router-link>
    </div>
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

</style>
