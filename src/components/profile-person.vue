<template>
  <div>
    <p class="weui-msg__title wx-page-title">个人信息</p>

    <div class="weui-cells__title">居住信息</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">现居城市</label></div>
        <div class="weui-cell__bd" >
          <input class="weui-input" placeholder="请输入您的现居城市" :disabled="!editable" :class="[{'text-mask': !editable}]" v-model="residentInfo.residentCity">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">详细地址</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入您的详细地址" :disabled="!editable" :class="[{'text-mask': !editable}]" v-model="residentInfo.residentAddress">
        </div>
      </div>

      <div class="weui-cell wx-select-box">
        <div class="weui-cell__hd"><label class="weui-label">居住时长</label></div>
        <div class="weui-cell__bd">
          <select class="weui-select" name="select1" :disabled="!editable" :class="[{'text-mask': !editable}]" v-model="residentInfo.residentTime">
            <option class="select-option" disabled value=''>请选择</option>
            <option class="select-option" value="0">{{ '小于 1 年' }}</option>
            <option class="select-option" value="1">{{ '1 ~ 3 年' }}</option>
            <option class="select-option" value="2">{{ '3 ~ 5 年' }}</option>
            <option class="select-option" value="3">{{ '大于 5 年' }}</option>
          </select>
        </div>
      </div>
    </div>


    <div class="weui-cells__title">学历职业</div>
    <div class="weui-cells weui-cells_form">

      <div class="weui-cell wx-select-box">
        <div class="weui-cell__hd"><label class="weui-label">最高学历</label></div>
        <div class="weui-cell__bd">
          <select class="weui-select" name="select2" :disabled="!editable" :class="[{'text-mask': !editable}]" v-model="educationInfo.education">
            <option class="select-option" disabled value=''>请选择</option>
            <option class="select-option" value="0">{{ '大学或大学以上' }}</option>
            <option class="select-option" value="1">{{ '大专' }}</option>
            <option class="select-option" value="2">{{ '高中' }}</option>
            <option class="select-option" value="3">{{ '初中' }}</option>
            <option class="select-option" value="4">{{ '小学' }}</option>
          </select>
        </div>
      </div>

      <div class="weui-cell wx-select-box">
        <div class="weui-cell__hd"><label class="weui-label">职业</label></div>
        <div class="weui-cell__bd">
          <select class="weui-select" name="select2" :disabled="!editable" :class="[{'text-mask': !editable}]" v-model="educationInfo.job">
            <option class="select-option" disabled value=''>请选择</option>
            <option class="select-option" value="0">{{ '1' }}</option>
            <option class="select-option" value="1">{{ '2' }}</option>
            <option class="select-option" value="2">{{ '3' }}</option>
            <option class="select-option" value="3">{{ '4' }}</option>
            <option class="select-option" value="4">{{ '5' }}</option>
          </select>
        </div>
      </div>

      <div class="weui-cell wx-select-box">
        <div class="weui-cell__hd"><label class="weui-label">月均收入</label></div>
        <div class="weui-cell__bd">
          <select class="weui-select" name="select2" :disabled="!editable" :class="[{'text-mask': !editable}]" v-model="educationInfo.income">
            <option class="select-option" disabled value=''>请选择</option>
            <option class="select-option" value="0">{{ '小于 500' }}</option>
            <option class="select-option" value="1">{{ '1000 ~ 2000' }}</option>
            <option class="select-option" value="2">{{ '2000 ~ 3000' }}</option>
            <option class="select-option" value="3">{{ '3000 ~ 5000' }}</option>
            <option class="select-option" value="4">{{ '大于 5000' }}</option>
          </select>
        </div>
      </div>
    </div>


    <div class="weui-cells__title">其他</div>
    <div class="weui-cells weui-cells_form">

      <div class="weui-cell wx-select-box">
        <div class="weui-cell__hd"><label class="weui-label">婚姻状态</label></div>
        <div class="weui-cell__bd">
          <select class="weui-select" name="select2" :disabled="!editable" :class="[{'text-mask': !editable}]" v-model="otherInfo.marriageStatus">
            <option class="select-option" disabled value=''>请选择</option>
            <option class="select-option" value="0">{{ '未婚' }}</option>
            <option class="select-option" value="1">{{ '已婚' }}</option>
          </select>
        </div>
      </div>

      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">QQ</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入您的QQ号码" :disabled="!editable" :class="[{'text-mask': !editable}]" v-model="otherInfo.qq">
        </div>
      </div>

    </div>


    <div class="weui-btn-area" v-if="editable">
      <a class="weui-btn weui-btn_primary" :class="[{'weui-btn_loading': waitingResponse}]" @click="save"><i
        v-if="waitingResponse" class="weui-loading"></i>保存</a>
    </div>
    <div class="weui-btn-area" v-else>
      <a class="weui-btn weui-btn_primary" @click="edit">我要修改</a>
    </div>

    <!--<div id="loadingToast" style="opacity: 0; display: none;">-->
    <!--<div class="weui-mask_transparent"></div>-->
    <!--<div class="weui-toast">-->
    <!--<i class="weui-loading weui-icon_toast"></i>-->
    <!--<p class="weui-toast__content">数据加载中</p>-->
    <!--</div>-->
    <!--</div>-->

    <div id="toast" :class="[showToast? 'toast-on': 'toast-off']">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
        <p class="weui-toast__content">保存完成</p>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  import tabbar from "./tabbar.vue";
  import router from '../router'

  export default {
    components: {tabbar},
    name: 'profile-person',
    data() {
      return {
        waitingResponse: false,
        showToast: false,
        editable: true,
        residentInfo: {
          residentCity: '',
          residentAddress: '',
          residentTime: ''
        },
        educationInfo: {
          education: '',
          job: '',
          income: ''
        },
        otherInfo: {
          marriageStatus: '',
          qq: ''
        }
      }
    },
    computed: {},
    methods: {
      save() {
        this.waitingResponse = true

        this.$http.post('/api/v1/user/profile/general', {
          residentCity: this.residentInfo.residentCity,
          residentAddress: this.residentInfo.residentAddress,
          residentTime: this.residentInfo.residentTime,
          education: this.educationInfo.education,
          job: this.educationInfo.job,
          income: this.educationInfo.income,
          marriageStatus: this.otherInfo.marriageStatus,
          qq: this.otherInfo.qq
        }).then(response => {
          this.waitingResponse = false
          this.showToast = true
          this.editable = false

          this.$http.get('/api/v1/user/profile/identity')
            .then(response => {
              setTimeout(() => {
                this.showToast = false
                // TODO push to summary page?
                router.push('/profile')
              }, 1500)
            })
            .catch(error => {
              setTimeout(() => {
                this.showToast = false
                router.push('/profile-id')
              }, 1500)
            })
        })
          .catch(error => {
            this.waitingResponse = false
            // TODO show error dialog
          })

      },
      edit() {
        this.waitingResponse = true
        this.$http.get('/api/v1/user/profile/general')
          .then((response) => {
            this.residentInfo.residentCity = response.data.residentCity
            this.residentInfo.residentAddress = response.data.residentAddress
            this.residentInfo.residentTime = response.data.residentTime
            this.educationInfo.education = response.data.education
            this.educationInfo.job = response.data.job
            this.educationInfo.income = response.data.income
            this.otherInfo.marriageStatus = response.data.marriageStatus
            this.otherInfo.qq = response.data.qq
            this.editable = true
            this.waitingResponse = false
          })
          .catch((error) => {
            this.editable = true
            this.waitingResponse = false
          })
      }
    },
    created() {
      this.$http.get('/api/v1/user/profile/general')
        .then((response) => {
          this.residentInfo.residentCity = response.data.residentCity
          this.residentInfo.residentAddress = response.data.residentAddress
          this.residentInfo.residentTime = response.data.residentTime
          this.educationInfo.education = response.data.education
          this.educationInfo.job = response.data.job
          this.educationInfo.income = response.data.income
          this.otherInfo.marriageStatus = response.data.marriageStatus
          this.otherInfo.qq = response.data.qq
          this.editable = false
        })
    }
  }
</script>

<style scoped>
  .toast-on {
    opacity: 1;
  }

  .toast-off {
    opacity: 0;
    display: none;
  }

  .weui-cells__title {
    text-align: left;
    margin-top: 20px;
  }

  .weui-cell {
    text-align: left;
  }

  .wx-identity-self-photo {
    margin-top: 24px;
  }

  .wx-id-label {
    width: auto;
  }

  .wx-select-box {
    height: 25px;
  }

  .weui-select {
    padding-left: 0;
  }
</style>
