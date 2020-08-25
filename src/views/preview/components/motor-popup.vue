<template>
  <div class="popup-container" v-show="isShow">
    <div class="wrap">
      <div class="popup caption grey--text text--darken-2">
        当前位置<br />X:{{ motorPosition.x }} Y:{{ motorPosition.y }}
        <v-btn icon x-small="" class="close-icon" @click="closePopup">
          <v-icon size="16">{{ iconClose }}</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { icon } from '@/config/icon';
import { MotorParam } from '@/api/motor';

@Component
export default class PopupView extends Vue {
  @Prop() motorPosition!: MotorParam;

  isShow: boolean = false;
  iconClose = icon.mdiClose;

  mounted() {}
  create() {}
  closePopup() {
    this.isShow = false;
  }
  openPopup() {
    // debugger;
    this.isShow = true;
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.popup-container {
  position: relative;

  .wrap {
    position: absolute;
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
