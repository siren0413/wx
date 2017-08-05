<template>
  <div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
        <div class="weui-cell__bd">
          <template v-if="editable">
            <input class="weui-input" placeholder="请输入您的姓名" v-model="name">
          </template>
          <template v-else>
            <label style="width: 100%" :class="[{'text-mask': !editable}]" class="weui-label"> {{ name | maskName
              }}</label>
          </template>
        </div>
      </div>

      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">身份证号</label></div>
        <div class="weui-cell__bd">
          <template v-if="editable">
            <input class="weui-input" placeholder="请输入您的身份证号" v-mask="'##################'" v-model="idNumber">
          </template>
          <template v-else>
            <label style="width: 100%" :class="[{'text-mask': !editable}]" class="weui-label"> {{ idNumber | maskId
              }}</label>
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
        editable: true,
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
            this.editable = false

            this.$http.get('/api/v1/user/profile/general')
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
        this.waitingResponse = true
        this.$http.get('/api/v1/user/profile/identity')
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
      }
    },
    created() {
      this.$http.get('/api/v1/user/profile/identity')
        .then((response) => {
          this.name = response.data.name
          this.idNumber = response.data.idNumber
          this.editable = false
        })
    },
    filters: {
      maskId: function (value) {
        if (!value) return ''
        value = value.toString()
        return '********** ' + value.substring(value.length - 4, value.length)
      },
      maskName: function (value) {
        if (!value) return ''
        value = value.toString()
        return '** ' + value.substring(value.length - 1, value.length)
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
