<template>
  <div>
    <div class="weui-tabbar">
      <a href="javascript:;" class="weui-tabbar__item weui-bar__item_on">
                    <span style="display: inline-block;position: relative;">
                        <img src="../assets/icon_tabbar.png" alt="" class="weui-tabbar__icon">
                        <span class="weui-badge" style="position: absolute;top: -2px;right: -13px;">8</span>
                    </span>
        <p class="weui-tabbar__label">微信</p>
      </a>
      <a href="javascript:;" class="weui-tabbar__item">
        <img src="../assets/icon_tabbar.png" alt="" class="weui-tabbar__icon">
        <p class="weui-tabbar__label">通讯录</p>
      </a>
      <a href="javascript:;" class="weui-tabbar__item">
                    <span style="display: inline-block;position: relative;">
                        <img src="../assets/icon_tabbar.png" alt="" class="weui-tabbar__icon">
                        <span class="weui-badge weui-badge_dot" style="position: absolute;top: 0;right: -6px;"></span>
                    </span>
        <p class="weui-tabbar__label">发现</p>
      </a>
      <!--<a href="javascript:;" class="weui-tabbar__item">-->
        <!--<img src="../assets/icon_tabbar.png" alt="" class="weui-tabbar__icon">-->
        <!--<p class="weui-tabbar__label">我</p>-->
      <!--</a>-->

      <router-link to="/login" class="weui-tabbar__item">
        <img src="../assets/icon_tabbar.png" alt="" class="weui-tabbar__icon">
        <p class="weui-tabbar__label">干哈啊</p>
      </router-link>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'tabbar',
    data() {
      return {

      }
    },
    computed: {

    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
