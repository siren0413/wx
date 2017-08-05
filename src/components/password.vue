<template>
  <div>

    <template v-if="passwordStatus == 1">
      <div class="weui-cells__title">设置密码</div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">设置密码</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="password" placeholder="请输入密码" v-model="passwordCreate.input">
          </div>
          <template v-if="passwordCreate.input.length > 0">
            <div v-if="!isValidPassword(passwordCreate.input)">
              <i style="display: block" class="weui-icon-warn"></i>
            </div>
            <div v-else>
              <i style="display: block" class="weui-icon-success"></i>
            </div>
          </template>

        </div>

        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">确认密码</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="password" placeholder="请再次输入密码" v-model="passwordCreate.confirm">
          </div>
          <div v-if="passwordCreate.input.length > 0 && passwordCreate.confirm.length > 0">
            <template v-if="passwordCreate.input === passwordCreate.confirm">
              <i style="display: block" class="weui-icon-success"></i>
            </template>
            <template v-else>
              <i style="display: block" class="weui-icon-warn"></i>
            </template>
          </div>
        </div>
      </div>

      <div class="weui-btn-area">
        <a class="weui-btn weui-btn_primary" @click="save">提交</a>
      </div>
    </template>

    <template v-if="passwordStatus == 0">
      <div class="weui-cells__title">修改密码</div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">当前密码</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="password" placeholder="请输入当前密码" v-model="passwordUpdate.currentPassword">
          </div>
        </div>

        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">新密码</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="password" placeholder="请输入新密码" v-model="passwordUpdate.input">
          </div>
          <template v-if="passwordUpdate.input.length > 0">
            <div v-if="!isValidPassword(passwordUpdate.input)">
              <i style="display: block" class="weui-icon-warn"></i>
            </div>
            <div v-else>
              <i style="display: block" class="weui-icon-success"></i>
            </div>
          </template>
        </div>

        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">确认新密码</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="password" placeholder="请再次输入新密码" v-model="passwordUpdate.confirm">
          </div>
          <div v-if="passwordUpdate.input.length > 0 && passwordUpdate.confirm.length > 0">
            <template v-if="passwordUpdate.input === passwordUpdate.confirm">
              <i style="display: block" class="weui-icon-success"></i>
            </template>
            <template v-else>
              <i style="display: block" class="weui-icon-warn"></i>
            </template>
          </div>
        </div>
      </div>

      <div class="weui-btn-area">
        <a class="weui-btn weui-btn_primary" @click="update">提交</a>
      </div>
    </template>


    <div :style="showResultDialog? 'display: block;': 'display:none'">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{result.title}}</strong></div>
        <div class="weui-dialog__bd">{{result.desc}}</div>
        <div class="weui-dialog__ft">
          <a href="javascript:;" @click="confirmDialog(result.status)" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>
        </div>
      </div>
    </div>

    <div id="loadingToast" :class="[showLoadingToast? 'toast-on': 'toast-off']">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
        <i class="weui-loading weui-icon_toast"></i>
        <p class="weui-toast__content">数据加载中</p>
      </div>
    </div>

  </div>
</template>

<script>
  import tabbar from "./tabbar.vue";
  import router from '../router'

  export default {
    components: {tabbar},
    name: 'store',
    data() {
      return {
        passwordCreate: {
          input: '',
          confirm: '',
        },
        passwordUpdate: {
          currentPassword: '',
          input: '',
          confirm: ''
        },
        showResultDialog: false,
        result: {
          title: '',
          desc: '',
          status: null
        },
        showLoadingToast: false,
        passwordStatus: null
      }
    },
    computed: {},
    methods: {
      confirmDialog(status) {
        this.getPasswordStatus()
        this.cleanForm()
        this.showResultDialog = false
        if (status === 0) {
          router.push('/service')
        }
      },
      isValidPassword(password) {
        return /^[0-9a-zA-Z]{6,16}$/.test(password)
      },
      save() {
        if (this.isValidPassword(this.passwordCreate.input) && this.passwordCreate.input === this.passwordCreate.confirm) {
          this.showLoadingToast = true
          this.$http.post('/api/v1/user/password/create', {
            password: this.passwordCreate.input
          })
            .then((response) => {
              this.result.title = "成功"
              this.result.desc = "密码设置成功"
              this.result.status = 0
              this.showLoadingToast = false
              this.showResultDialog = true
            })
            .catch((error) => {
              this.result.title = "失败"
              this.result.desc = "密码设置失败"
              this.result.status = 1
              if (error && error.message) {
                this.result.desc = error.message
              }
              this.showLoadingToast = false
              this.showResultDialog = true
            })
        }
      },
      update() {
        if (this.isValidPassword(this.passwordUpdate.currentPassword) && this.isValidPassword(this.passwordUpdate.input) && this.passwordUpdate.input === this.passwordUpdate.confirm) {
          this.showLoadingToast = true
          this.$http.post('/api/v1/user/password/update', {
            currentPassword: this.passwordUpdate.currentPassword,
            newPassword: this.passwordUpdate.input
          })
            .then((response) => {
              this.result.title = "成功"
              this.result.desc = "密码修改成功"
              this.result.status = 0
              this.showLoadingToast = false
              this.showResultDialog = true
            })
            .catch((error) => {
              this.result.title = "失败"
              this.result.desc = "密码修改失败"
              this.result.status = 1
              if (error && error.message) {
                this.result.desc = error.message
              }
              this.showLoadingToast = false
              this.showResultDialog = true
            })
        }
      },
      getPasswordStatus() {
        this.showLoadingToast = true
        this.passwordStatus = null
        this.$http.get('/api/v1/user/password/status')
          .then((response) => {
            this.passwordStatus = response.data.status
            this.showLoadingToast = false
          })
          .catch((error) => {
            this.showLoadingToast = false
          })
      },
      cleanForm() {
        this.passwordUpdate.input = ''
        this.passwordUpdate.confirm = ''
        this.passwordUpdate.currentPassword = ''
        this.passwordCreate.input = ''
        this.passwordCreate.confirm = ''
      }
    },
    created() {
      this.getPasswordStatus()
    }
  }
</script>

<style scoped>
  .weui-cells__title {
    text-align: left;
    margin-top: 20px;
  }

  .weui-cell {
    text-align: left;
  }

  .toast-on {
    opacity: 1;
  }

  .toast-off {
    opacity: 0;
    display: none;
  }
</style>
