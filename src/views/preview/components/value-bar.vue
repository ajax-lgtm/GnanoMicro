<template>
  <div class="value-bar" v-show="isShow">
    <v-icon color="white" class="mx-2">{{barIcon}}</v-icon>
    <v-progress-linear
      max="100"
      min="1"
      class="linear-bar"
      height="10"
      v-model="slideValue"
      color="white"
    ></v-progress-linear>
    <span class="mx-2 white--text value-text">{{ slideValue }}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import pStore from "@/store/preview.ts";
import * as configIcon from "@/config/icon";
// import * as config from "@/config/index";

@Component
export default class ValueBar extends Vue {
  icon = configIcon.icon;

  get barIcon() {
    if (pStore.isShutterTimeUpdate) return this.icon.mdiBrightness;
    else return this.icon.mdiArrowUpDownBold;
  }
  get isShow() {
    return pStore.isValueBarShow;
  }

  get slideValue() {
    let r = 0;
    if (pStore.isFocusZUpdate) r = pStore.focusZ;
    if (pStore.isShutterTimeUpdate) r = pStore.shutterTime;
    return r.toFixed(1) + "%";
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.value-bar {
  position: absolute;
  height: 50px;
  border-radius: 15px;
  top: calc(25vh);
  width: 50%;
  left: 50%;
  margin-left: -25%;
  z-index: 10;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  .linear-bar {
    flex: 1;
    /* width: 80%; */
  }
  .value-text {
    width: 50px;
    text-align: right;
  }
}
</style>
