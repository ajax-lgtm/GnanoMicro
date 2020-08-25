<template>
  <div class="plate-map-container" v-show="isShow">
    <v-card class="mx-auto map-card">
      <div class="card-container" id="map-container">
        <div class="map-container">
          <div
            id="plate-map"
            class="plate-map"
            :style="plateMapCursorStyle"
          ></div>
          <motor-popup-view
            ref="motorPopup"
            id="motor-popup"
            class="motor-popup"
            :motorPosition="motorPosition"
          ></motor-popup-view>
          <div class="map-action-btn-container">
            <v-btn-toggle
              class="map-action-btn"
              style="flex-direction: column;"
              dense
            >
              <v-btn
                icon
                height="30px"
                width="30px"
                style="min-width:24px"
                @click="setPlateMapMax"
              >
                <v-icon size="16" color="#333">{{ iconFullscreen }}</v-icon>
              </v-btn>

              <v-btn
                icon
                height="30px"
                width="30px"
                style="min-width:24px"
                @click="setPlateMapHome"
              >
                <v-icon size="16" color="#333">{{ iconHome }}</v-icon>
              </v-btn>
              <v-btn
                icon
                height="30px"
                width="30px"
                style="min-width:24px"
                @click="setPlateMapExtendVirtical"
              >
                <v-icon size="16" color="#333">{{ iconVertical }}</v-icon>
              </v-btn>
              <v-btn
                icon
                height="30px"
                width="30px"
                style="min-width:24px"
                @click="setTargetPosition(false)"
              >
                <v-icon size="16" color="#333">{{ iconGps }}</v-icon>
              </v-btn>
              <v-btn
                icon
                height="30px"
                width="30px"
                style="min-width:24px"
                @click="setTargetPosition(true)"
              >
                <v-icon size="16" color="#333">{{ iconGpsCross }}</v-icon>
              </v-btn>
              <v-btn
                icon
                height="30px"
                width="30px"
                style="min-width:24px"
                @click="findMotorPosition"
              >
                <v-icon size="16" color="#333">{{ iconGpsFind }}</v-icon>
              </v-btn>
            </v-btn-toggle>
          </div>
        </div>
      </div>
      <v-btn
        icon
        height="24px"
        width="24px"
        style="min-width:24px; background-color:white;"
        @click="setPlateMapClose"
        class="fullscreen-icon"
        color="red"
      >
        <v-icon small color="red">{{ icon.mdiCloseCircle }}</v-icon>
      </v-btn>

      <!-- </v-btn-toggle> -->
      <!-- </v-card> -->
    </v-card>
  </div>
</template>

<script lang="ts">
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";

import { Vue, Component } from "vue-property-decorator";
import * as configIcon from "@/config/icon";
import * as motorApi from "@/api/motor";
import pStore from "@/store/preview.ts";
import screenfull from "screenfull";
import { PlateMap } from "@/ts/modules/PlateMap";
import { plateData } from "@/ts/data/plates";
import MotorPopupView from "@/views/preview/components/motor-popup.vue";

@Component({
  components: {
    MotorPopupView,
  },
})
export default class PlateMapView extends Vue {
  icon = configIcon.icon;
  iconFullscreen = this.icon.mdiFullscreen;
  iconClose = this.icon.mdiClose;
  iconHome = this.icon.mdiHomeOutline;
  iconGps = this.icon.mdiCrosshairsGps;
  iconGpsFind = this.icon.mdiCrosshairsQuestion;
  iconGpsCross = this.icon.mdiCrosshairs;
  iconVertical = this.icon.mdiArrowExpandVertical;

  motorPositonElement = document.getElementById("motor-popup");
  isMotorPopupShow = false;

  map?: L.DrawMap;
  // plate?: Plate;
  plateMap?: PlateMap;
  motorPosition: motorApi.MotorData = {};
  motorPositionMark?: L.Marker;
  isFirstShow?: boolean;
  plateMapCursorStyle: string = "";

  created() {
    this.isFirstShow = true;
  }

  mounted() {
    this.map = L.map("plate-map", {
      crs: L.CRS.Simple,
      minZoom: 0,
      maxZoom: 16,
      zoom: 3,
      zoomSnap: 0.1,
      zoomDelta: 2,
      zoomControl: false,
      attributionControl: false,
      center: [0, 0],
    });
    this.plateMap = new PlateMap();
    this.plateMap.initPlatesFromJson(this.map, plateData.plates[1]);
    this.plateMap.drawPlateOnMap();

    this.motorPosition = {};

    this.motorPositionMark = this.plateMap.initMotorPostionMark();
    if (this.motorPositionMark) {
      this.motorPositionMark.on("click", () => {
        this.openMotorPopup();
      });
    }

    this.motorPositonElement = document.getElementById("motor-popup");

    if (this.motorPositonElement)
      this.plateMap.updateMotorPositionMark(
        this.motorPosition,
        this.motorPositonElement
      );

    if (this.plateMap.map)
      this.plateMap.map.on("move", () => {
        if (this.plateMap && this.motorPositonElement) {
          this.plateMap.updateMotorPositionMark(
            this.motorPosition,
            this.motorPositonElement
          );
        }
      });

    motorApi.setSpeed({
      x: 10,
      y: 10,
      z: 1,
    });

    setInterval(() => {
      if (pStore.isPlateMapShow) {
        this.getMotorPosition();
      }
    }, 300);
  }

  openMotorPopup() {
    let el: any = this.$refs.motorPopup;
    el.openPopup();
  }

  get isShow() {
    if (pStore.isPlateMapShow) {
      if (this.isFirstShow) {
        setTimeout(() => {
          this.setPlateMapHome();
        }, 10);
        this.isFirstShow = false;
      }
      return true;
    } else return false;
  }

  setPlateMapMax() {
    if (this.map) {
      this.map.off("click");
      this.plateMapCursorStyle = "cursor: auto";
      this.map.invalidateSize();
      let oldCenter = this.map.getCenter();
      let oldZoom = this.map.getZoom();
      let oldWindowSize = this.map.getSize();
      let isFirstTime = true;

      const element = document.getElementById("map-container");
      if (document !== null) {
        if (screenfull.isEnabled) {
          if (!screenfull.isFullscreen) screenfull.request(element as Element);
          else screenfull.exit();
        }
        if (screenfull.isEnabled) {
          let tId = setInterval(() => {
            if (this.map && isFirstTime) {
              this.map.invalidateSize();
              let newWindowSize = this.map.getSize();
              if (newWindowSize.x !== oldWindowSize.x) {
                let zoom = newWindowSize.y / oldWindowSize.y;
                zoom = Math.log(zoom) / Math.log(2) + oldZoom;
                this.map.setView(oldCenter, zoom);
                clearInterval(tId);
              }
              oldWindowSize.x = newWindowSize.x;
            }
          }, 200);
        }
      }
      // setTimeout(() => {}, 1000);
    }
  }

  async getMotorPosition() {
    let pos = await motorApi.getPosition(["X", "Y", "Z"]);
    if (pos) {
      if (JSON.stringify(pos) !== JSON.stringify(this.motorPosition)) {
        // console.log(r.position);
        // console.log(this.motorPosition);
        this.motorPosition = pos;

        if (this.plateMap && this.motorPositonElement) {
          this.plateMap.updateMotorPositionMark(
            this.motorPosition,
            this.motorPositonElement
          );
        }
      }
    }
  }

  setPlateMapClose() {
    pStore.setState({ isPlateMapShow: false });
  }

  setPlateMapHome() {
    if (this.map) {
      this.map.off("click");
      this.plateMapCursorStyle = "cursor: auto";
      this.map.invalidateSize();

      let xPlateSize = 130;
      let yPlateSize = 90;
      let xViewSize = this.map.getSize().x;
      let yViewSize = this.map.getSize().y;

      let plateRatio = xPlateSize / yPlateSize;
      let mapRatio = xViewSize / yViewSize;

      let zoom =
        plateRatio < mapRatio ? yViewSize / yPlateSize : xViewSize / xPlateSize;

      zoom = Math.log(zoom) / Math.log(2);
      this.map.setView([0, 0], zoom);

      // debugger;

      if (this.plateMap) {
        let imageList = pStore.imageList;
        // debugger;
        this.plateMap.drawImageListOnMap(imageList);
      }
    }
  }

  setPlateMapExtendVirtical() {
    if (this.map) {
      this.map.off("click");
      this.plateMapCursorStyle = "cursor: auto";
      this.map.invalidateSize();
      let yPlateSize = 90;
      let yViewSize = this.map.getSize().y;
      let zoom = yViewSize / yPlateSize;
      zoom = Math.log(zoom) / Math.log(2);
      this.map.setView([0, 0], zoom);
    }
  }

  // async setMotorPosition(position: motorApi.MotorParam) {
  //   await motorApi.setPosition(position);
  // }

  setTargetPosition(isGrid: boolean) {
    // debugger;
    this.plateMapCursorStyle = isGrid ? "cursor: cell" : "cursor: crosshair";
    if (this.map) {
      {
        this.map.on("click", (e: any) => {
          if (this.plateMap && this.plateMap.platesData) {
            let position = this.plateMap.drawTargetMarkerOnMap(
              { x: e.latlng.lng, y: e.latlng.lat },
              isGrid
            );

            motorApi.goto({
              x: position.x,
              y: position.y,
            });
          }

          // debugger;
          // console.log(r);
        });
      }
    }
  }

  findMotorPosition() {
    if (this.map && this.motorPosition) {
      let zoom = 5;
      if (
        this.motorPosition.x !== undefined &&
        this.motorPosition.y !== undefined
      )
        this.map.setView([this.motorPosition.y, this.motorPosition.x], zoom);
    }
  }
}
</script>

<style>
.popup-goto-btn {
  height: 16px;
  widows: 16px;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.plate-map-container {
  position: absolute;
  bottom: 45px;
  z-index: 20;
  /* height: 30px; */
  width: 100%;
  height: 40%;
  max-width: 500px;
  max-height: 400px;
  /* background: rgba(0, 0, 0, 0.3); */
}

.map-card {
  width: 95%;
  height: 95%;
  position: relative;
  overflow: hidden;
  .motor-popup {
    position: absolute;
    z-index: 100;
  }
}

.map-action-btn-container {
  height: 100%;
  width: 40px;
  float: right;
  position: relative;
}

.map-action-btn {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
}

.plate-map {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  background: black;
}

.fullscreen-icon {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
}

.map-container {
  /* background-color: red; */
  width: 100%;
  height: 100%;
}

.card-container {
  /* background-color: blue; */
  /* margin: 5px, 5px, 5px, 5px; */
  /* width: 90%;
  height: 90%; */
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;

  /* margin: 5px; */
}
</style>
