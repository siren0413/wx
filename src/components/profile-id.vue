<template>
  <div>
    <p class="weui-msg__title wx-page-title">实名认证</p>

    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入您的姓名" v-model="name">
        </div>
      </div>

      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">身份证号</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入您的身份证号" v-model="idNumber">
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

    <div class="weui-btn-area" v-if="!editable">
      <a class="weui-btn weui-btn_primary" :class="[{'weui-btn_loading': waitingResponse}]" @click="save"><i
        v-if="waitingResponse" class="weui-loading"></i>保存</a>
    </div>
    <div class="weui-btn-area" v-else>
      <a class="weui-btn weui-btn_primary" @click="edit">我要修改</a>
    </div>

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
    name: 'profile-id',
    data() {
      return {
        waitingResponse: false,
        editable: false,
        showToast: false,
        name: '',
        idNumber: ''
      }
    },
    computed: {},
    methods: {
      save() {
        this.waitingResponse = true
        this.$http.post('/api/v1/user/profile/identity', {
          name: this.name,
          idNumber: this.idNumber
        })
          .then(response => {
            this.waitingResponse = false
            this.showToast = true
            this.editable = true

            this.$http.get('/api/v1/user/profile/general')
              .then(response => {
                setTimeout(() => {
                  this.showToast = false
                  // TODO push to summary page?
                  router.push('/store')
                }, 1500)
              })
              .catch(error => {
                setTimeout(() => {
                  this.showToast = false
                  router.push('/profile-person')
                }, 1500)
              })
          })
          .catch(error => {
            this.waitingResponse = false
            // TODO show error dialog
          })
      },
      edit() {
        this.editable = false
      }
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
  .toast-on {
    opacity: 1;
  }

  .toast-off {
    opacity: 0;
    display: none;
  }
</style>
