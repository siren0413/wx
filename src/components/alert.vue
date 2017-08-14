<template>

  <transition name="alert">
    <div class="alert-mask">
      <div class="alert-wrapper">
        <div class="alert-container">

          <div class="weui-dialog">
            <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{title}}</strong></div>
            <div class="weui-dialog__bd">{{desc}}</div>
            <div class="weui-dialog__ft">
              <a @click="$emit('ok')" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  </transition>

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

  .alert-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .2s ease;
  }

  .alert-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .alert-container {
    width: auto;
    margin: 0px auto;
    padding: 20px 30px;
    border-radius: 2px;
    transition: all .2s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .alert-enter .alert-container,
  .alert-leave-active .alert-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
