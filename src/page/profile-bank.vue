<template>
  <div>

    <div class="weui-cells__title">银行卡信息</div>
    <div class="weui-cells weui-cells_radio">

      <template v-for="(account, index) in bankAccounts">
        <label class="weui-cell weui-check__label" >
          <div class="weui-cell__bd">
            <p> {{account.accountNumber | maskBankAccount}}</p>
          </div>
          <div class="weui-cell__ft">
            <input type="radio" class="weui-check" name="radio1" id="bankAccount" :value="account.accountNumber" v-model="defaultBankAccountNumber">
            <span class="weui-icon-checked"></span>
          </div>
        </label>
      </template>
    </div>

    {{defaultBankAccountNumber}}


    <div class="weui-cells">
      <router-link to="/profile/bank/add" class="weui-cell weui-cell_access" href="javascript:;">
        <div class="weui-cell__bd">
          <p>添加银行卡</p>
        </div>
        <div class="weui-cell__ft">
        </div>
      </router-link>
      <a class="weui-cell weui-cell_access" href="javascript:;">
        <div class="weui-cell__bd">
          <p>删除银行卡</p>
        </div>
        <div class="weui-cell__ft">
        </div>
      </a>
    </div>

    <div class="weui-btn-area" @click="save">
      <a class="weui-btn weui-btn_primary" :class="[{'weui-btn_loading': waitingResponse}]">
        <i v-if="waitingResponse" class="weui-loading"></i>保存</a>
    </div>

    <error-toast :message="message"></error-toast>

  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import router from "../router";

  export default {
    name: 'profile-bank',
    data() {
      return {
        waitingResponse:false,
        message:'',
        bankAccounts : [],
        defaultBankAccountNumber: null
      }
    },
    computed: {},
    methods: {
      ...mapActions(['showErrorToast']),
      save() {
        if (!this.defaultBankAccountNumber) {
          this.message = '请添加银行卡'
          return
        }
        let defaultAccount = this.bankAccounts.find((elem, pos, arr) => {
          return elem.accountNumber === this.defaultBankAccountNumber
        })
        this.waitingResponse = true
        this.$http.put(`/api/public/user/${this.uid()}/profile/bank/default`,{
          name:defaultAccount.name,
          idNumber:defaultAccount.idNumber,
          accountNumber:defaultAccount.accountNumber
        }).then((response=>{
          this.waitingResponse = false
          // TODO show success toast
        })).catch((error) =>{
          this.waitingResponse = false
          this.message = "保存失败"
          this.showErrorToast()
        })


      }
    },
    created() {
      this.$http.get(`/api/public/user/${this.uid()}/profile/bank`)
        .then((response)=>{
          this.bankAccounts = response.data
        })
      this.$http.get(`/api/public/user/${this.uid()}/profile/bank/default`)
        .then((response)=>{
          this.defaultBankAccountNumber = response.data.accountNumber
        })
    }
  }
</script>

<style scoped>
  .weui-cells {
    text-align: left;
  }

  .weui-cells__title {
    text-align: left;
  }
</style>
