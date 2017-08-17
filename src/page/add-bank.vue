<template>
  <div>

    <div class="weui-cells weui-cells_form">
      <div class="weui-cell" :class="{'animated shake': animations.name}">
        <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入您的姓名" v-model="name">
        </div>
      </div>

      <div class="weui-cell" :class="{'animated shake': animations.idNumber}">
        <div class="weui-cell__hd"><label class="weui-label">身份证号</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="tel" pattern="[0-9]*" placeholder="请输入您的身份证号" v-mask="'### ### #### #### ####'" v-model="idNumber">
        </div>
      </div>

      <div class="weui-cell" :class="{'animated shake': animations.accountNumber}">
        <div class="weui-cell__hd"><label class="weui-label">银行卡号</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="tel" pattern="[0-9]*" placeholder="请输入您的银行卡号" v-mask="'#### #### #### ####'" v-model="accountNumber">
        </div>
      </div>
    </div>

    <div class="weui-btn-area" @click="add">
      <a class="weui-btn weui-btn_primary" :class="[{'weui-btn_loading': waitingResponse}]">
        <i v-if="waitingResponse" class="weui-loading"></i>添加</a>
    </div>

    <success-toast message="添加成功"></success-toast>
    <error-toast :message="message"></error-toast>

  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: 'store',
    data() {
      return {
        animations: {
          name: false,
          idNumber: false,
          accountNumber: false
        },
        waitingResponse: false,
        message: '',
        name: '',
        idNumber: '',
        accountNumber: ''
      }
    },
    computed: {},
    methods: {
      ...mapActions(['showErrorToast','showSuccessToast']),
      add() {
        let success = true;
        if (!this.name) {
          this.animations.name = true
          success = false
        }
        if (!this.idNumber) {
          this.animations.idNumber = true
          success = false
        }
        if (!this.accountNumber) {
          this.animations.accountNumber = true
          success = false
        }
        if (!success) return
        this.waitingResponse = true
        this.$http.post(`/api/public/user/${this.uid()}/profile/bank`, {
          name: this.name,
          idNumber: this.idNumber.replace(/\s+/g, ''),
          accountNumber: this.accountNumber.replace(/\s+/g, '')
        })
          .then((response => {
            this.waitingResponse = false
            this.showSuccessToast()
            setTimeout(()=>{
              this.goToReferrer('Profile')
            },500)
          }))
          .catch((error) => {
            this.waitingResponse = false
            this.message = "添加失败"
            this.showErrorToast()
          })
      },
      cleanupTimer() {
        this.animations.name = false
        this.animations.idNumber = false
        this.animations.accountNumber = false
      }
    },
    created() {
      setInterval(this.cleanupTimer, 2000)
    }
  }
</script>

<style scoped>
  .weui-cell {
    text-align: left;
  }
</style>
