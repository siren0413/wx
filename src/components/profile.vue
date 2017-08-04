<template>
  <div>

    <p class="weui-msg__title wx-page-title">认证中心</p>

    <div class="weui-cells">
      <router-link to="/profile-id" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">实名认证</div>
        <div class="weui-cell__ft" style="font-size: 0">
          <span style="vertical-align:middle; font-size: 17px;">未完成</span>
          <span class="weui-badge weui-badge_dot" style="margin-left: 5px;margin-right: 5px;"></span>
        </div>
      </router-link>
      <router-link to="/profile-person" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">个人信息</div>
        <div class="weui-cell__ft" style="font-size: 0">
          <span style="vertical-align:middle; font-size: 17px;">{{ generalProfileStatus.desc }}</span>
          <span v-if="generalProfileStatus.status == 1" class="weui-badge weui-badge_dot" style="margin-left: 5px;margin-right: 5px;"></span>
        </div>
      </router-link>
    </div>

  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  import tabbar from "./tabbar.vue";

  export default {
    components: {tabbar},
    name: 'profile',
    data() {
      return {
        idProfileStatus: {
          status:null,
          desc:''
        },
        generalProfileStatus:{
          status:null,
          desc:''
        }
      }
    },
    computed: {},
    methods: {},
    created() {
      console.log("fdsf")
      this.$http.get('/api/v1/user/profile/general/status')
        .then((response) => {
          this.generalProfileStatus.status = response.data.status
          this.generalProfileStatus.desc = response.data.desc
        })
    }
  }
</script>

<style scoped>
  .weui-cell {
    text-align: left;
  }
</style>
