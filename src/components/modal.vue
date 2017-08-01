<template>
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="weui-dialog">
                <div class="weui-dialog__hd"><strong class="weui-dialog__title">弹窗标题</strong></div>
                <div class="weui-dialog__bd">弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内</div>
                <div class="weui-dialog__ft">
                  <a @click="$emit('cancel')" class="weui-dialog__btn weui-dialog__btn_default">取消</a>
                  <a @click="$emit('ok')" class="weui-dialog__btn weui-dialog__btn_primary">确认</a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </transition>
</template>

<script>
  export default {
    name: 'modal',
    data() {
      return {}
    },
    computed: {},
    methods: {}
  }
</script>

<style scoped>
  .modal-mask {
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

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    border-radius: 2px;
    transition: all .2s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  /*.modal-header h3 {*/
    /*margin-top: 0;*/
    /*color: #42b983;*/
  /*}*/

  /*.modal-body {*/
    /*margin: 20px 0;*/
  /*}*/

  /*.modal-default-button {*/
    /*float: right;*/
  /*}*/

  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container ,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>


