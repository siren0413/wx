<template>

  <div class="wx-apply-status-container">


    <template v-if="appHistory.length === 0">
      <div>
        <img src="../assets/service/empty.png" style="height: 100px; margin-top: 30%"/>
        <div style="margin-top: 20px; font-size: 16px">
          <p>暂无申请记录</p>
        </div>
      </div>
    </template>

    <template v-else>

      <div class="weui-cells__title">申请信息</div>
      <div class="weui-form-preview" v-if="selectedApp.loanInfo">
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">申请日期</label>
            <span class="weui-form-preview__value">{{selectedApp.loanInfo.startDate && formatDate(selectedApp.loanInfo.startDate,'YYYY年MM月DD日')}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">还款日期</label>
            <span class="weui-form-preview__value">{{selectedApp.loanInfo.deadline && formatDate(selectedApp.loanInfo.deadline,'YYYY年MM月DD日')}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">借款金额</label>

            <span class="weui-form-preview__value">{{selectedApp.loanInfo.amount}}</span>
            <img src="../assets/home/rmb-gray.png" class="wx-subtotal-img">
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">手续费</label>

            <span class="weui-form-preview__value">{{selectedApp.loanInfo.fee}}</span>
            <img src="../assets/home/rmb-gray.png" class="wx-subtotal-img">
          </div>
        </div>
      </div>

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

        <template v-for="(app, index) in appHistory">
          <a class="weui-cell weui-cell_access wx-history-cell" @click="selectApplication(index)">
            <div class="weui-cell__bd">
              <img v-if="app.selected" src="../assets/service/calendar_on.png" class="wx-img-history-item"/>
              <img v-if="!app.selected" src="../assets/service/calendar_off.png" class="wx-img-history-item"/>
              <span class="app-history-span" :class="{'wx-history-select':app.selected}">{{formatDate(app.date,"YYYY-MM-DD")}} </span>
            </div>
            <div class="weui-cell__ft" ref="history">
              <img v-if="app.selected" src="../assets/service/rmb_on.png" class="wx-img-history-item"/>
              <img v-if="!app.selected" src="../assets/service/rmb_off.png" class="wx-img-history-item"/>
              <span class="app-history-span" :class="{'wx-history-select':app.selected}">
              {{app.loanAmount}} 元
            </span>
              <img v-if="app.selected" src="../assets/service/loan-term_on.png" class="wx-img-history-item" style="padding-left: 10px"/>
              <img v-if="!app.selected" src="../assets/service/loan-term_off.png" class="wx-img-history-item" style="padding-left: 10px"/>
              <span class="app-history-span" :class="{'wx-history-select':app.selected}">
              {{app.loanTerm}} 天
            </span>
            </div>
          </a>
        </template>
      </div>

    </template>

    <div class="wx-bot-margin"></div>
    <loading-toast></loading-toast>
  </div>
</template>

<script>
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
      selectApplication(index) {
        this.appHistory.forEach((elem) => {
          elem.selected = false
        })
        this.currentIndex = index
        this.appHistory[this.currentIndex].selected = true
      },
      getApplication(appId) {
        this.$http.get(`/api/public/user/${this.uid()}/loan/application/${appId}`)
          .then((response) => {
            this.selectedApp = response.data
            this.selectApplication(this.currentIndex)
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

  .wx-recent-history {
    padding-top: 20px;
  }

  .weui-icon_toast {
    margin-top: auto;
  }

  .wx-history-select {
    color: #87c890 !important;
  }

  .wx-history-cell {
    color: #999999;
    font-size: 16px;
    font-weight: 500;
  }

  .wx-img-history-item {
    width: 16px;
    height: 16px;
    vertical-align: middle;
    margin-right: 1px;
    padding-bottom: 4px;
  }
  .wx-subtotal-img {
    height: 14px;
    vertical-align: middle;
    margin-top: -4px;
  }
  .weui-form-preview__value{
    display: inline;
  }
</style>
