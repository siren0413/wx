<template>
  <div class="page__bd page__bd_spacing">

    <div v-for="(status,index) in statusList">
      <div class="icon-box">
        <i class="weui-icon_msg wx-progress-icon" :class="getClass(status.status)"></i>
        <div class="icon-box__ctn">
          <h3 class="icon-box__title">{{status.title}}</h3>
          <p class="icon-box__desc">{{status.desc}}</p>
        </div>
      </div>
      <div>
        <div v-if="index !== statusList.length-1">
          <img src="../assets/progress-line-success.png" class="wx-progress-line"/>
        </div>
      </div>
    </div>

    <div class="wx-bot-margin"></div>
  </div>
</template>

<script>
  import tabbar from "./tabbar.vue";

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
      getClass(id) {
        if (id === 0) return 'weui-icon-success'
        else if (id === 1) return 'weui-icon-waiting'
        else if (id === 2) return 'weui-icon-warn'
      }
    },
    created() {
      this.$http.get('/api/v1/loan/application/status/all')
        .then((response) => {
          this.statusList = response.data.statusList
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
    padding: 0 80px
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
</style>
