<template>
  <div class="wx-page-title">
    <p class="weui-media-box__title">{{ computeCurrentTabName }}</p>
  </div>
</template>

<script>
  export default {
    name: 'tabbar',
    data() {
      return {
        pathNameMapping: {
          '/store': '我要借款',
          '/repay': '我要还款',
          '/profile': '认证中心',
          '/profile-id': '实名认证',
          '/profile-person': '个人信息',
          '/service': '服务台',
          '/apply-status': '审核状态',
          '/service-password': '密码服务',
          '/faq': '常见问题'
        }
      }
    },
    computed: {
      computeCurrentTabName() {
        let path = this.$route.path
        return this.pathNameMapping[path]
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .weui-media-box__title {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
  }
</style>
