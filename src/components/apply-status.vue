<template>
  <div class="page__bd page__bd_spacing">

    <div class="icon-box">
      <i class="weui-icon-waiting weui-icon_msg wx-progress-icon"></i>
      <div class="icon-box__ctn">
        <h3 class="icon-box__title">等待</h3>
        <p class="icon-box__desc">用于表示等待</p>
      </div>
    </div>
    <div class="icon-box">
      <i class="weui-icon-warn weui-icon_msg"></i>
      <div class="icon-box__ctn">
        <h3 class="icon-box__title">强烈警告</h3>
        <p class="icon-box__desc">用于表示操作后将引起严重的不可挽回的后果的情况</p>
      </div>
    </div>

  </div>
</template>

<script>
  import tabbar from "./tabbar.vue";

  export default {
    components: {tabbar},
    name: 'apply-status',
    data() {
      return {}
    },
    computed: {},
    methods: {}
  }
</script>

<style scoped>
  .icon-box {
    margin-bottom: 25px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .icon-box__ctn {
    -webkit-flex-shrink: 100;
    flex-shrink: 100;
    text-align: left;
  }

  .icon-box__title {
    font-weight: 400
  }

  .icon-box__desc {
    margin-top: 6px;
    font-size: 12px;
    color: #888
  }

  .weui-icon_msg {
    padding-right: 15px;
  }

  .page__bd {
    position: relative
  }

  .page__bd_spacing {
    padding: 0 80px
  }
  .wx-progress-icon{
    font-size: 80px;
  }
</style>
