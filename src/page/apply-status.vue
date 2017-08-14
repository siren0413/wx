<template>

  <div class="wx-apply-status-container">

    <div class="weui-cells__title">当前审核状态</div>
    <div class="weui-cells" v-if="selectedApp.recordHistory && selectedApp.recordHistory.length > 0">
      <div class="weui-cell" v-for="record in selectedApp.recordHistory">
        <div class="weui-cell__hd"></div>
        <div class="weui-cell__bd">
          <p>
            <span>{{record.desc}}</span>
          </p>
        </div>
        <div class="weui-cell__ft" v-if="record.status==='PENDING'"><i class="weui-icon-waiting weui-icon_toast"></i></div>
        <div class="weui-cell__ft" v-if="record.status==='SUCCESS'"><i class="weui-icon-success weui-icon_toast"></i></div>
        <div class="weui-cell__ft" v-if="record.status==='FAILURE'"><i class="weui-icon-warn weui-icon_toast"></i></div>
      </div>
    </div>
    <div v-if="selectedApp.recordHistory && selectedApp.recordHistory.length == 0">
      <img src="../assets/service/empty.png" style="height: 80px; margin-top: 10%"/>
      <div style="margin-top: 20px; font-size: 16px">
        <p>暂无状态</p>
      </div>
    </div>


    <div class="weui-cells__title wx-recent-history">最近审核记录</div>
    <div class="weui-cells">

      <template v-for="(app,index) in appHistory">
        <a class="weui-cell weui-cell_access" @click="openApplication(index)">
          <div class="weui-cell__bd">
            <p>
              <span class="app-history-span">{{formatDate(app.date)}} </span>
              <span class="app-history-span">借款金额:{{app.loanAmount}}</span>
              <span class="app-history-span">借款天数:{{app.loanTerm}}</span>
            </p>
          </div>
          <div class="weui-cell__ft"></div>
        </a>
      </template>
    </div>


    <div class="wx-bot-margin"></div>
    <loading-toast></loading-toast>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import moment from 'moment'

  export default {
    name: 'apply-status',
    data() {
      return {
        appHistory: [],
        currentIndex: 0,
        selectedApp: {},
      }
    },
    computed: {},
    methods: {
      openApplication(index) {
        this.currentIndex = index
      },
      formatDate(unixTime) {
        return moment(unixTime).format('YYYY-MM-DD')
      },
      getApplication(appId) {
        this.$http.get(`/api/public/user/${this.uid()}/loan/application/${appId}`)
          .then((response) => {
            this.selectedApp = response.data
          }).catch((error)=>{
        })
      }
    },
    watch: {
      currentIndex: function (updated, old) {
        let ap = this.appHistory[updated]
        this.getApplication(ap.appId)
      }
    },
    created() {
      this.$http.get(`/api/public/user/${this.uid()}/loan/application/history`)
        .then((response) => {
          this.appHistory = response.data
          if (this.appHistory) {
            let ap = this.appHistory[this.currentIndex]
            this.getApplication(ap.appId)
          }
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

  .app-history-span {
    color: #999999;
    font-size: 16px;
  }
  .wx-recent-history{
    padding-top: 20px;
  }
  .weui-icon_toast {
    margin-top: auto;
  }
</style>
