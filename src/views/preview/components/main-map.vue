<template>
  <div v-show="isShow">
    <div id="mapid" class="map"></div>
    <v-btn
      fab
      dark
      small
      color="white"
      class="mr-2 show-btn"
      @click="hideAllBar"
    >
      <v-icon color="black">{{ eyeIcon }}</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { MainMap } from '@/ts/modules/MainMap';
import { Component, Vue } from 'vue-property-decorator';
import * as configIcon from '@/config/icon';
import pStore from '@/store/preview.ts';

@Component
export default class MainMapView extends Vue {
  icon = configIcon.icon;
  map?: MainMap;

  get eyeIcon() {
    return pStore.isAllBarHidden ? this.icon.mdiEye : this.icon.mdiEyeOff;
  }

  hideAllBar() {
    pStore.setState({ isAllBarHidden: !pStore.isAllBarHidden });
  }

  get isShow() {
    return !pStore.isMainMapHidden;
  }

  mounted() {
    this.map = new MainMap();
    this.map.initMap();
    this.map.initImage();
    this.map.setMapVideoOn(true);
    this.map.initScale();
    this.map.initToolBar();
    this.map.initFrewDraw();
    this.map.calNewRio();
    this.map.refreshImage();
    this.map.initMapAction();
    this.map.initRefreshImage();
  }
}
</script>
<style>
.leaflet-control-scale {
  padding-bottom: 50px;
  padding-left: 10px;
}
.leaflet-top {
  top: 60px;
}
.leaflet-right {
  right: -6px;
}
</style>

<style scoped>
.map {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;

  background-color: black;
  z-index: 0;
}

.show-btn {
  position: fixed;
  right: 0;
  bottom: 80px;
}
</style>
