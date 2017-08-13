<template>
    <div style="display: block;">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{title}}</strong></div>
        <div class="weui-dialog__bd">{{desc}}</div>
        <div class="weui-dialog__ft">
          <a @click="$emit('ok')" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>
        </div>
      </div>
    </div>
</template>

<script>

  export default {
    props: ['title', 'desc'],
    name: 'alert',
    data() {
      return {}
    },
    computed: {},
    methods: {}
  }
</script>

<style scoped>
  .weui-mask{
    width: 100%;
    height: 100%;
    z-index: 1002 !important;
  }

</style>
