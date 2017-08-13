<template>

  <div class="wx-apply-status-container">

    <!--<div class="page__bd page__bd_spacing" v-if="statusList.length > 0">-->
      <!--<div v-for="(status,index) in statusList">-->
        <!--<div class="icon-box">-->
          <!--<i class="weui-icon_msg wx-progress-icon" :class="getClass(status.status)"></i>-->
          <!--<div class="icon-box__ctn">-->
            <!--<h3 class="icon-box__title">{{status.title}}</h3>-->
            <!--<p class="icon-box__desc">{{status.desc}}</p>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div>-->
          <!--<div v-if="index !== statusList.length-1">-->
            <!--<img src="../assets/service/progress-line-success.png" class="wx-progress-line"/>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div v-else>-->
      <!--<img src="../assets/service/empty.png" style="height: 80px; margin-top: 30%"/>-->
      <!--<div style="margin-top: 20px; font-size: 16px">-->
        <!--<p>亲，没有找到您的审核申请</p>-->
      <!--</div>-->
    <!--</div>-->


    <div class="weui-cells__title">当前审核状态</div>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__hd"></div>
        <div class="weui-cell__bd">
          <p>标题文字</p>
        </div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
    </div>



    <div class="weui-cells__title">最近审核记录</div>
    <div class="weui-cells">
      <a class="weui-cell weui-cell_access" href="javascript:;">
        <div class="weui-cell__bd">
          <p>cell standard</p>
        </div>
        <div class="weui-cell__ft">
        </div>
      </a>
      <a class="weui-cell weui-cell_access" href="javascript:;">
        <div class="weui-cell__bd">
          <p>cell standard</p>
        </div>
        <div class="weui-cell__ft">
        </div>
      </a>
    </div>


    <div class="wx-bot-margin"></div>
    <loading-toast></loading-toast>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import tabbar from "../components/tabbar.vue";

  export default {
    components: {tabbar},
    name: 'apply-status',
    data() {
      return {
        statusList: []
      }
    },
    computed: {},
    methods: {
      ...mapActions(['incLoadingCount', 'decLoadingCount']),
      getClass(id) {
        if (id === 0) return 'weui-icon-success'
        else if (id === 1) return 'weui-icon-waiting'
        else if (id === 2) return 'weui-icon-warn'
      }
    },
    created() {
      this.incLoadingCount()
      this.$http.get('/api/public/loan/application/status/all')
        .then((response) => {
          this.statusList = response.data.statusList
          this.decLoadingCount()
        }).catch((error) => {
        this.decLoadingCount()
      })
    }
  }
</script>

<style scoped>
  .icon-box {
    margin-bottom: 5px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    min-height: 70px;
  }

  .icon-box__ctn {
    -webkit-flex-shrink: 100;
    flex-shrink: 100;
    text-align: left;
  }

  .icon-box__title {
    font-weight: 400;
    font-size: 16px;
  }

  .icon-box__desc {
    margin-top: 6px;
    font-size: 12px;
    height: 38px;
    color: #888
  }

  .weui-icon_msg {
    padding-right: 15px;
  }

  .page__bd {
    position: relative
  }

  .page__bd_spacing {
    padding: 0 20%
  }

  .wx-progress-icon {
    font-size: 28px;
    margin-top: -40px;
  }

  .wx-progress-line {
    padding-top: 8px;
    padding-bottom: 8px;
    height: 20px;
  }

  .wx-apply-status-container {
    padding-top: 40px;
  }

  .weui-cells__title {
    text-align: left;
    margin-top: 20px;
  }

  .weui-cell {
    text-align: left;
  }
</style>
