<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="weui-dialog">
            <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{ title }}</strong></div>
            <div class="weui-dialog__bd">{{ desc }}</div>
            <div class="weui-dialog__ft">
              <a @click="$emit('cancel')" class="weui-dialog__btn weui-dialog__btn_default">{{cancel_text}}</a>
              <a @click="$emit('ok')" class="weui-dialog__btn weui-dialog__btn_primary">{{ok_text}}</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: ['title', 'desc', 'ok_text', 'cancel_text'],
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
    width: auto;
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

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>


