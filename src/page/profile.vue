<template>
  <div>
    <div class="weui-cells">
      <router-link to="/profile/id" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">实名认证</div>
        <div class="weui-cell__ft" style="font-size: 0">
          <span style="vertical-align:middle; font-size: 17px;">{{ idProfileStatus.desc }}</span>
          <span v-if="idProfileStatus.status == 1" class="weui-badge weui-badge_dot" style="margin-left: 5px;margin-right: 5px;"></span>
        </div>
      </router-link>
      <router-link to="/profile/person" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">个人信息</div>
        <div class="weui-cell__ft" style="font-size: 0">
          <span style="vertical-align:middle; font-size: 17px;">{{ generalProfileStatus.desc }}</span>
          <span v-if="generalProfileStatus.status == 1" class="weui-badge weui-badge_dot" style="margin-left: 5px;margin-right: 5px;"></span>
        </div>
      </router-link>
      <router-link to="/profile/bank" class="weui-cell weui-cell_access" v-if="bankStatus === 'ELIGIBLE'">
        <div class="weui-cell__bd">银行卡信息</div>
        <div class="weui-cell__ft"></div>
      </router-link>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'profile',
    data() {
      return {
        bankStatus:null,
        idProfileStatus: {
          status: null,
          desc: ''
        },
        generalProfileStatus: {
          status: null,
          desc: ''
        }
      }
    },
    computed: {},
    methods: {},
    created() {
      this.$http.get(`/api/public/user/${this.uid()}/profile/personal/complete`)
        .then((response) => {
          this.generalProfileStatus.status = response.data.status
          this.generalProfileStatus.desc = response.data.desc
        })
      this.$http.get(`/api/public/user/${this.uid()}/profile/identity/complete`)
        .then((response) => {
          this.idProfileStatus.status = response.data.status
          this.idProfileStatus.desc = response.data.desc
        })
      this.$http.get(`/api/public/user/${this.uid()}/profile/bank/complete`)
        .then((response) => {
          this.bankStatus = response.data.status
        })
    }
  }
</script>

<style scoped>
  .weui-cell {
    text-align: left;
  }
</style>
