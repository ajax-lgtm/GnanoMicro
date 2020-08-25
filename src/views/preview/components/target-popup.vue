<template>
  <div class="popup-container">
    <div class="wrap">
      <div class="popup caption grey--text text--darken-2">
        <slot></slot>
        <v-btn icon x-small="" class="close-icon" @click="closePopup">
          <v-icon size="16">{{ iconClose }}</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { icon } from '@/config/icon';

@Component
export default class PopupView extends Vue {
  // @Prop() isShow!: boolean;

  // isPopupShow: boolean = false;
  iconClose = icon.mdiClose;

  // @Watch('isShow')
  // onChangeValue(newVal: boolean, oldVal: boolean) {
  //   this.isPopupShow = this.isShow;
  // }

  mounted() {}
  create() {}
  closePopup() {
    this.$emit('popupCloseEvent');
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.popup-container {
  position: relative;

  .wrap {
    position: absolute;
    // background-color: red;
    // left: 100px;
    // top: 100px;
    .popup {
      position: relative;
      display: flex;
      justify-content: center;
      width: fit-content;
      height: fit-content;
      min-width: 100px;
      min-height: 60px;
      padding: 10px 10px 10px;
      //   border: 1px solid #e0e0e0;
      border-radius: 10px;
      bottom: 8px;
      transform: translateX(-50%) translateY(-100%);
      background-color: #fff;
      .close-icon {
        position: absolute;
        right: 0px;
        top: 0px;
      }
    }

    .popup::after {
      content: '';
      position: absolute;
      bottom: -7.6px;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 10px solid #fff;
    }
  }
}
</style>
