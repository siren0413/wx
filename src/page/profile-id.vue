<template>
  <div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell" :class="{'animated shake': animations.name}">
        <img class="wx-img-name" src="../assets/profile/user.png" title="User">
        <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
        <div class="weui-cell__bd">
          <template v-if="editable">
            <input class="weui-input" placeholder="请输入您的姓名" v-model="name">
          </template>
          <template v-else>
            <label style="width: 100%" :class="[{'text-mask': !editable}]" class="weui-label"> {{ name | maskName}}</label>
          </template>
        </div>
      </div>

      <div class="weui-cell" :class="{'animated shake': animations.idNumber}">
        <img class="wx-img-id" src="../assets/profile/id.png" title="ID Card Filled">
        <div class="weui-cell__hd"><label class="weui-label">身份证号</label></div>
        <div class="weui-cell__bd">
          <template v-if="editable">
            <input class="weui-input" type="tel" pattern="[0-9]*" placeholder="请输入您的身份证号" v-mask="'### ### #### #### ####'" v-model="idNumber">
          </template>
          <template v-else>
            <label style="width: 100%" :class="[{'text-mask': !editable}]" class="weui-label"> {{ idNumber | maskId}}</label>
          </template>
        </div>
      </div>
    </div>


    <div class="weui-cells weui-cells_form wx-identity-self-photo">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">持证自拍</label></div>
      </div>
    </div>

    <div class="weui-cells weui-cells_form wx-identity-self-photo">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label wx-id-label">身份证正面(人像)</label></div>
      </div>
    </div>

    <div class="weui-btn-area" v-if="editable">
      <a class="weui-btn weui-btn_primary" :class="[{'weui-btn_loading': waitingResponse}]" @click="save"><i
        v-if="waitingResponse" class="weui-loading"></i>保存</a>
    </div>
    <div class="weui-btn-area" v-else>
      <a class="weui-btn weui-btn_primary" :class="{'weui-btn_disabled': pendingApplication}" @click="edit">我要修改</a>
    </div>

    <div id="toast" :class="[showToast? 'toast-on': 'toast-off']">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
        <p class="weui-toast__content">保存完成</p>
      </div>
    </div>

    <error-toast :message="errorToastMessage"></error-toast>

  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import router from '../router/index'

  export default {
    name: 'profile-id',
    data() {
      return {
        waitingResponse: false,
        editable: true,
        showToast: false,
        pendingApplication: false,
        errorToastMessage: '',
        name: '',
        idNumber: '',
        animations: {
          name: false,
          idNumber: false
        }
      }
    },
    computed: {},
    methods: {
      ...mapActions(['showErrorToast']),
      save() {
        let success = true;
        if (!this.name) {
          this.animations.name = true;
          success = false;
        }
        if (!this.idNumber) {
          this.animations.idNumber = true;
          success = false;
        }
        if (!success) return;
        this.waitingResponse = true
        this.$http.post(`/api/public/user/${this.uid()}/profile/identity`, {
          name: this.name,
          idNumber: this.idNumber.replace(/\s+/g, '')
        })
          .then(response => {
            this.waitingResponse = false
            this.showToast = true
            this.editable = false
            setTimeout(() => {
              this.goToReferrer('Profile')
            }, 1000)
          })
          .catch(error => {
            this.waitingResponse = false
            this.errorToastMessage = "保存失败"
            this.showErrorToast()
          })
      },
      edit() {
        if (this.pendingApplication) {
          this.errorToastMessage = '资料审核中...'
          this.showErrorToast()
          return
        }
        this.waitingResponse = true
        this.$http.get(`/api/public/user/${this.uid()}/profile/identity`)
          .then((response) => {
            this.name = response.data.name
            this.idNumber = response.data.idNumber
            this.editable = true
            this.waitingResponse = false
          })
          .catch((error) => {
            this.editable = true
            this.waitingResponse = false
          })
      },
      cleanupTimer() {
        this.animations.name = false;
        this.animations.idNumber = false;
      }
    },
    created() {
      this.$http.get(`/api/public/user/${this.uid()}/profile/identity`)
        .then((response) => {
          if (response.data) {
            this.name = response.data.name
            this.idNumber = response.data.idNumber
            this.editable = false
          }
        })
      this.$http.get(`/api/public/user/${this.uid()}/loan/application/search`, {
        params: {
          open: true
        }
      }).then((response) => {
          this.pendingApplication = response.data.result === true;
        })
      setInterval(this.cleanupTimer, 2000)
    }
  }
</script>

<style scoped>
  .weui-cell {
    text-align: left;
  }

  .wx-identity-self-photo {
    margin-top: 24px;
  }

  .wx-id-label {
    width: auto;
  }

  .wx-img-name {
    width: 20px;
    height: 20px;
    padding-bottom: 5px;
    padding-right: 8px;
  }

  .wx-img-id {
    width: 22px;
    height: 24px;
    padding-bottom: 3px;
    padding-right: 6px;
  }

  .toast-on {
    opacity: 1;
  }

  .toast-off {
    opacity: 0;
    display: none;
  }
</style>
