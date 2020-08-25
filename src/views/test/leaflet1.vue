<template name="component-name">
  <div class="map-container"><div id="testMapId" class="map"></div></div>
</template>

<script lang="ts">
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Leaflet1 extends Vue {
  mounted() {
    let mymap = L.map('testMapId').setView([51.505, -0.09], 13);

    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
      {
        maxZoom: 18,
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
      },
    ).addTo(mymap);

    L.marker([51.5, -0.09])
      .addTo(mymap)
      .bindPopup('<b>Hello world!</b><br />I am a popup.')
      .openPopup();

    L.circle([51.508, -0.11], 500, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0,
      weight: 1,
    })
      .addTo(mymap)
      .bindPopup('I am a circle.');

    L.polygon(
      [
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047],
      ],
      {
        weight: 1,
        smoothFactor: 2,
      },
    )
      .addTo(mymap)
      .bindPopup('I am a polygon.');

    let popup = L.popup();

    function onMapClick(e: any) {
      popup
        .setLatLng(e.latlng)
        .setContent('You clicked the map at ' + e.latlng.toString())
        .openOn(mymap);
    }

    mymap.on('click', onMapClick);

    let myIcon = L.divIcon({
      html: '<div style="color:red">狗子</div>',
      className: 'my-div-icon',
      iconSize: 30,
    } as any);
    L.marker([51.505, -0.09], { icon: myIcon }).addTo(mymap);
  }
}
</script>

<style scoped>
.map-container {
  margin: 50px auto;
}
.map {
  width: 1000px;
  height: 800px;

  /* background-color: red; */
}
</style>
