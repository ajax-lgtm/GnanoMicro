<template name="component-name">
  <div class="map-container"><div id="map" class="map"></div></div>
</template>

<script lang="ts">
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import { Component, Vue } from 'vue-property-decorator';

import { PlateMap } from './PlateMap';

@Component
export default class Leaflet1 extends Vue {
  mounted() {
    let map = L.map('map', {
      crs: L.CRS.Simple,
      minZoom: 0,
      maxZoom: 16,
      zoom: 2,
      zoomSnap: 1,
      zoomControl: false,
      attributionControl: false,
      center: [0, 0]
    });
    let plateMap = new PlateMap();
    plateMap.initPlatesFromJson(map, 0);
    plateMap.drawPlateOnMap();
    // console.log(plateMap.platesData);

    if (map) {
      map.on('zoomend', () => {
        // this.isTouchStopped = false;
        // clearTimeout(this.timeId);
        setTimeout(() => {
          // plateMap.updateLabels(map.getZoom());
          // console.log('zoomend');
          // }
        }, 100);
      });
    }
  }
}
</script>

<style scoped>
.map-container {
  margin: 50px auto;
  /* width: 1000px; */
  /* height: 600px; */
  /* border: 2px solid red; */
  width: 100%;
  height: 100%;
}
.map {
  /* position: absolute; */
  width: 100%;
  height: 100%;
  top: 0;

  background-color: white;
  z-index: 0;
}
</style>

<style>
.my-div-icon {
  width: 100px;
  height: 100px;
}
</style>
