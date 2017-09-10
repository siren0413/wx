<template>
  <div>

    <div class="weui-cells__title">银行卡信息 (默认收款/还款银行卡)</div>
    <div class="weui-cells weui-cells_radio">

      <template v-for="(account, index) in bankAccounts">
        <label class="weui-cell weui-check__label">
          <div class="weui-cell__ft">
            <input type="radio" class="weui-check" name="radio1" id="bankAccount" :value="account.accountNumber" v-model="defaultBankAccountNumber">
            <span class="weui-icon-checked"></span>
          </div>
          <div class="weui-cell__bd">
            <p> {{account.accountNumber | maskBankAccount}}</p>
          </div>
          <div @click="confirmDelete(account.accountNumber)">
            <template v-if="account.accountNumber === defaultBankAccountNumber ">
              <img src="../assets/profile/delete_icon.png" style="height: 18px"/>
            </template>
            <template v-else>
              <img src="../assets/profile/delete_icon_off.png" style="height: 18px"/>
            </template>
          </div>
        </label>
      </template>
      <router-link :to="{name:'AddBank', query: {referrer: $route.query.referrer? $route.query.referrer: 'ProfileBank'}}" class="weui-cell weui-cell_link">
        <div class="weui-cell__bd">添加更多</div>
      </router-link>
    </div>


    <div class="weui-btn-area" @click="save">
      <a class="weui-btn weui-btn_primary" :class="[{'weui-btn_loading': waitingResponse}]">
        <i v-if="waitingResponse" class="weui-loading"></i>保存</a>
    </div>

    <error-toast :message="message"></error-toast>
    <success-toast message="保存成功"></success-toast>
    <modal v-if="showModal" @ok="deleteAccount" @cancel="showModal=!showModal" title="确认删除" :desc="formatDeleteConfirmationDesc()" ok_text="确定删除"
           cancel_text="取消"></modal>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import router from "../router";

  export default {
    name: 'profile-bank',
    data() {
      return {
        waitingResponse: false,
        message: '',
        showModal: false,
        accountToBeDelete: null,
        bankAccounts: [],
        defaultBankAccountNumber: null
      }
    },
    computed: {},
    methods: {
      ...mapActions(['showErrorToast', 'showSuccessToast']),
      save() {
        if (!this.defaultBankAccountNumber) {
          this.message = '请选择银行卡'
          this.showErrorToast()
          return
        }
        let defaultAccount = this.bankAccounts.find((elem, pos, arr) => {
          return elem.accountNumber === this.defaultBankAccountNumber
        })
        this.waitingResponse = true
        this.$http.put(`/api/public/user/${this.uid()}/profile/bank`, {
          defaultBankAccountNumber: defaultAccount.accountNumber
        }).then((response => {
          this.waitingResponse = false
          this.showSuccessToast()
          setTimeout(() => {
            this.goToReferrer('Profile')
          }, 500)
        })).catch((error) => {
          this.waitingResponse = false
          this.message = "保存失败"
          this.showErrorToast()
        })
      },
      confirmDelete(accountNumber) {
        this.accountToBeDelete = accountNumber
        this.showModal = true
      },
      deleteAccount() {
        this.$http.delete(`/api/public/user/${this.uid()}/profile/bank/account/${this.accountToBeDelete}`)
          .then((response=>{
            this.bankAccounts = response.data.bankAccounts
            this.defaultBankAccountNumber = response.data.defaultBankAccountNumber
          }))
          .catch((error => {
            this.message = "删除失败"
            this.showErrorToast()
            this.$http.get(`/api/public/user/${this.uid()}/profile/bank`)
              .then((response) => {
                this.bankAccounts = response.data.bankAccounts
                this.defaultBankAccountNumber = response.data.defaultBankAccountNumber
              })
          }))
        this.showModal = false
      },
      formatDeleteConfirmationDesc(){
        return `您确定要删除尾号为 ${this.accountToBeDelete.substring(this.accountToBeDelete.length - 4, this.accountToBeDelete.length)} 的银行卡吗？`
      }
    },
    created() {
      this.$http.get(`/api/public/user/${this.uid()}/profile/bank`)
        .then((response) => {
          this.bankAccounts = response.data.bankAccounts
          this.defaultBankAccountNumber = response.data.defaultBankAccountNumber
        })
    }
  }
</script>

<style scoped>
  .weui-cells {
    text-align: left;
  }

  .weui-cell {
    padding-left: 2vw;
  }

  .weui-cells__title {
    text-align: left;
  }

  .weui-cell__bd {
  }

  .weui-icon-checked {
    width: 3vw;
    padding-right: 4vw;
  }

  .weui-cell_link {
    /*padding-left: 10vw;*/
    text-align: center;
  }
</style>
