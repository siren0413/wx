<template>
  <div>
    <div class="weui-cells__title">居住信息</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell" :class="{'animated shake': animations.city}" >
        <img class="wx-img-city" src="https://png.icons8.com/home/ultraviolet/100" title="Home">
        <div class="weui-cell__hd"><label class="weui-label">现居城市</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" placeholder="请输入您的现居城市" :disabled="!editable" :class="[{'text-mask': !editable}]"
                 v-model="residentInfo.residentCity">
        </div>
      </div>
      <div class="weui-cell" :class="{'animated shake': animations.address}">
        <img class="wx-img-address" src="../assets/profile/location.png" title="Address">
        <div class="weui-cell__hd"><label class="weui-label">详细地址</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入您的详细地址" :disabled="!editable" :class="[{'text-mask': !editable}]" v-model="residentInfo.residentAddress">
        </div>
      </div>

      <div class="weui-cell wx-select-box" :class="{'animated shake': animations.time}">
        <img class="wx-img-time" src="../assets/profile/time.png" title="Time">
        <div class="weui-cell__hd"><label class="weui-label">居住时长</label></div>
        <div class="weui-cell__bd">
          <select class="weui-select" name="select1" :disabled="!editable" :class="[{'text-mask': !editable}]" v-model="residentInfo.residentTime">
            <option class="select-option" disabled value=''>请选择</option>
            <option class="select-option" value="0">{{ '小于 1 年' }}</option>
            <option class="select-option" value="1">{{ '1 至 3 年' }}</option>
            <option class="select-option" value="2">{{ '3 至 5 年' }}</option>
            <option class="select-option" value="3">{{ '大于 5 年' }}</option>
          </select>
        </div>
      </div>
    </div>


    <div class="weui-cells__title">个人信息</div>
    <div class="weui-cells weui-cells_form">

      <div class="weui-cell" :class="{'animated shake': animations.age}">
        <img class="wx-img-age" src="../assets/profile/age.png" title="Age">
        <div class="weui-cell__hd"><label class="weui-label">年龄</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="tel" pattern="[0-9]*" v-mask="'##'" placeholder="请输入您的年龄" :disabled="!editable" :class="[{'text-mask': !editable}]"
                 v-model="personalInfo.age">
        </div>
      </div>

      <div class="weui-cell wx-select-box" :class="{'animated shake': animations.education}">
        <img class="wx-img-education" src="../assets/profile/education.png" title="Education">
        <div class="weui-cell__hd"><label class="weui-label">最高学历</label></div>
        <div class="weui-cell__bd">
          <select class="weui-select" name="select2" :disabled="!editable" :class="[{'text-mask': !editable}]" v-model="personalInfo.education">
            <option class="select-option" disabled value=''>请选择</option>
            <option class="select-option" value="0">{{ '大学或大学以上' }}</option>
            <option class="select-option" value="1">{{ '大专' }}</option>
            <option class="select-option" value="2">{{ '高中' }}</option>
            <option class="select-option" value="3">{{ '初中' }}</option>
            <option class="select-option" value="4">{{ '小学' }}</option>
          </select>
        </div>
      </div>

      <div class="weui-cell wx-select-box" :class="{'animated shake': animations.job}">
        <img class="wx-img-job" src="../assets/profile/job.png" title="Job">
        <div class="weui-cell__hd"><label class="weui-label">职业</label></div>
        <div class="weui-cell__bd">
          <select class="weui-select" name="select2" :disabled="!editable" :class="[{'text-mask': !editable}]" v-model="personalInfo.job">
            <option class="select-option" disabled value=''>请选择</option>
            <option class="select-option" value="0">{{ '1' }}</option>
            <option class="select-option" value="1">{{ '2' }}</option>
            <option class="select-option" value="2">{{ '3' }}</option>
            <option class="select-option" value="3">{{ '4' }}</option>
            <option class="select-option" value="4">{{ '5' }}</option>
          </select>
        </div>
      </div>

      <div class="weui-cell wx-select-box" :class="{'animated shake': animations.income}">
        <img class="wx-img-income" src="../assets/profile/income.png" title="Income">
        <div class="weui-cell__hd"><label class="weui-label">月均收入</label></div>
        <div class="weui-cell__bd">
          <select class="weui-select" name="select2" :disabled="!editable" :class="[{'text-mask': !editable}]" v-model="personalInfo.income">
            <option class="select-option" disabled value=''>请选择</option>
            <option class="select-option" value="0">{{ '小于 500' }}</option>
            <option class="select-option" value="1">{{ '1000 至 2000' }}</option>
            <option class="select-option" value="2">{{ '2000 至 3000' }}</option>
            <option class="select-option" value="3">{{ '3000 至 5000' }}</option>
            <option class="select-option" value="4">{{ '大于 5000' }}</option>
          </select>
        </div>
      </div>
    </div>


    <div class="weui-cells__title">其他</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell wx-select-box" :class="{'animated shake': animations.marriage}">
        <img class="wx-img-marriage" src="../assets/profile/marriage.png" title="Marriage">
        <div class="weui-cell__hd"><label class="weui-label">婚姻状态</label></div>
        <div class="weui-cell__bd">
          <select class="weui-select" name="select2" :disabled="!editable" :class="[{'text-mask': !editable}]" v-model="otherInfo.marriageStatus">
            <option class="select-option" disabled value=''>请选择</option>
            <option class="select-option" value="0">{{ '未婚' }}</option>
            <option class="select-option" value="1">{{ '已婚' }}</option>
          </select>
        </div>
      </div>

      <div class="weui-cell" :class="{'animated shake': animations.qq}">
        <img class="wx-img-qq" src="../assets/profile/qq.png" title="QQ">
        <div class="weui-cell__hd"><label class="weui-label">QQ</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="tel" placeholder="请输入您的QQ号码" :disabled="!editable" :class="[{'text-mask': !editable}]" v-model="otherInfo.qq">
        </div>
      </div>

    </div>


    <div class="weui-btn-area" v-if="editable">
      <a class="weui-btn weui-btn_primary" :class="[{'weui-btn_loading': waitingResponse}]" @click="save"><i
        v-if="waitingResponse" class="weui-loading"></i>保存</a>
    </div>
    <div class="weui-btn-area" v-else>
      <a class="weui-btn weui-btn_primary" :class="{'weui-btn_disabled': pendingApplication}" @click="edit">我要修改</a>
    </div>

    <loading-toast></loading-toast>
    <error-toast :message="errorToastMessage"></error-toast>
    <success-toast message="保存完成"></success-toast>

    <div class="wx-bot-margin"></div>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import router from '../router/index';

  export default {
    name: 'profile-person',
    data() {
      return {
        ...mapState(['showSuccessToast']),
        waitingResponse: false,
        editable: true,
        pendingApplication: false,
        errorToastMessage:'',
        residentInfo: {
          residentCity: '',
          residentAddress: '',
          residentTime: ''
        },
        personalInfo: {
          age: null,
          education: '',
          job: '',
          income: ''
        },
        otherInfo: {
          marriageStatus: '',
          qq: ''
        },
        animations: {
          city: false,
          address: false,
          time: false,
          age: false,
          education: false,
          job: false,
          income: false,
          marriage: false,
          qq: false
        }
      }
    },
    computed: {},
    methods: {
      ...mapActions(['showErrorToast','showSuccessToast']),
      save() {
        let success = true;
        if (!this.residentInfo.residentCity) {
          this.animations.city = true;
          success = false;
        }
        if (!this.residentInfo.residentAddress) {
          this.animations.address = true;
          success = false;
        }
        if (!this.residentInfo.residentTime) {
          this.animations.time = true;
          success = false;
        }
        if (!this.personalInfo.age) {
          this.animations.age = true;
          success = false;
        }
        if (!this.personalInfo.education) {
          this.animations.education = true;
          success = false;
        }
        if (!this.personalInfo.job) {
          this.animations.job = true;
          success = false;
        }
        if (!this.personalInfo.income) {
          this.animations.income = true;
          success = false;
        }
        if (!this.otherInfo.marriageStatus) {
          this.animations.marriage = true;
          success = false;
        }
        if (!this.otherInfo.qq) {
          this.animations.qq = true;
          success = false;
        }
        if (!success) return;

        this.waitingResponse = true



        this.$http.post(`/api/public/user/${this.uid()}/profile/general`, {
          residentCity: this.residentInfo.residentCity,
          residentAddress: this.residentInfo.residentAddress,
          residentTime: this.residentInfo.residentTime,
          age: this.personalInfo.age,
          education: this.personalInfo.education,
          job: this.personalInfo.job,
          income: this.personalInfo.income,
          marriageStatus: this.otherInfo.marriageStatus,
          qq: this.otherInfo.qq
        }).then(response => {
          this.waitingResponse = false
          this.showSuccessToast()
          this.editable = false
          this.$http.get(`/api/public/user/${this.uid()}/profile/identity`)
            .then(response => {
              setTimeout(()=>{
                router.push('/profile')
              }, 1000)
            })
            .catch(error => {
              setTimeout(()=>{
                router.push('/profile/id')
              },1000)
            })
        })
          .catch(error => {
            this.waitingResponse = false
            // TODO show error dialog
          })

      },
      edit() {
        if (this.pendingApplication) {
          this.errorToastMessage = '资料审核中...'
          this.showErrorToast()
          return
        }
        this.waitingResponse = true
        this.$http.get(`/api/public/user/${this.uid()}/profile/general`)
          .then((response) => {
            this.residentInfo.residentCity = response.data.residentCity
            this.residentInfo.residentAddress = response.data.residentAddress
            this.residentInfo.residentTime = response.data.residentTime
            this.personalInfo.age = response.data.age
            this.personalInfo.education = response.data.education
            this.personalInfo.job = response.data.job
            this.personalInfo.income = response.data.income
            this.otherInfo.marriageStatus = response.data.marriageStatus
            this.otherInfo.qq = response.data.qq
            this.editable = true
            this.waitingResponse = false
          })
          .catch((error) => {
            this.editable = true
            this.waitingResponse = false
          })
      },
      cleanupTimer() {
        this.animations.city = false;
        this.animations.address = false;
        this.animations.time = false;
        this.animations.age = false;
        this.animations.education = false;
        this.animations.job = false;
        this.animations.income = false;
        this.animations.marriage = false;
        this.animations.qq = false;
      }
    },
    created() {
      this.$http.get(`/api/public/user/${this.uid()}/profile/general`)
        .then((response) => {
          this.residentInfo.residentCity = response.data.residentCity
          this.residentInfo.residentAddress = response.data.residentAddress
          this.residentInfo.residentTime = response.data.residentTime
          this.personalInfo.age = response.data.age
          this.personalInfo.education = response.data.education
          this.personalInfo.job = response.data.job
          this.personalInfo.income = response.data.income
          this.otherInfo.marriageStatus = response.data.marriageStatus
          this.otherInfo.qq = response.data.qq
          this.editable = false
        });
      this.$http.get(`/api/public/user/${this.uid()}/loan/application/pending/exist`)
        .then((response) => {
          this.pendingApplication = response.data.result === true;
        })
      setInterval(this.cleanupTimer, 2000)
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
  .wx-img-city, .wx-img-time, .wx-img-age, .wx-img-education, .wx-img-job, .wx-img-qq{
    width:20px;
    height:20px;
    padding-bottom: 5px;
    padding-right: 8px;
  }
  .wx-img-address{
    width:24px;
    height:24px;
    padding-bottom: 5px;
    padding-right: 6px;
    margin-left: -2px;
  }
  .wx-img-income {
    width:17px;
    height:17px;
    padding-bottom: 5px;
    padding-right: 8px;
    padding-left: 2px;
  }
  .wx-img-marriage{
    width:26px;
    height:28px;
    padding-bottom: 5px;
    padding-right: 4px;
  }
</style>
