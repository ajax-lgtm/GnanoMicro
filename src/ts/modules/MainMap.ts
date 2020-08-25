import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import * as config from "@/config/index";
import pStore from "@/store/preview.ts";
import { EventBus, EventAction } from "@/plugins/eventbus";
import * as cameraApi from "@/api/camera.ts";
import * as motorApi from "@/api/motor.ts";
import { Position } from "@/ts/modules/Common.ts";

import { Map } from "./Map";
// import { mdiTheater } from "@mdi/js";

export interface RioPixRange {
  west: number;
  east: number;
  north: number;
  south: number;
}

export interface Rio {
  mapZoom: number;
  mapBounds: L.LatLngBounds;
  mapCenter: L.LatLng;
  rioBounds?: L.LatLngBounds;
  rioPixRange?: RioPixRange;
  scale?: number;
}

export class MainMap {
  testMap = new Map();
  imageBaseUrl = config.imageStreamBaseUrl + "/image/";
  rioBaseUrl = config.imageStreamBaseUrl + "/rio/";
  imageUrl = "";
  imageLoadTime = 0;
  imageRefreshTime = 0;
  delayMs = 0;
  imageSizeMm = config.imageSizeMm;
  imageSizePixes = config.imageSizePixes;

  motorPostion: Position = { x: 0, y: 0 };
  imageCenter: Position = { x: 0, y: 0 };
  isTouchStopped = true;
  isTouchRuning = false;
  lastMoveTime = 0;
  mapFocusTime = 0;
  timeId = 0;
  map?: L.Map;
  rio?: Rio;
  image?: L.ImageOverlay;
  popup?: L.Popup;

  isTouchLeft = false;
  isTouchRight = false;
  yTouchLast = 0;
  isTouchLocked = false;

  get isImageUpdate() {
    return pStore.isMainMapImageUpdate;
  }

  set isImageUpdate(b: boolean) {
    pStore.setState({ isMainMapImageUpdate: b });
  }

  async getMotorPosition() {
    let pos = await motorApi.getPosition(["X", "Y"]);
    if (pos.x !== undefined && pos.y !== undefined) {
      this.motorPostion.x = pos.x;
      this.motorPostion.y = pos.y;
    }
    // console.log(this.motorPostion);
  }

  initMap() {
    this.getMotorPosition();
    this.imageCenter = this.motorPostion;
    this.map = L.map("mapid", {
      crs: L.CRS.Simple,
      minZoom: 0,
      maxZoom: 16,
      zoom: 10,
      zoomSnap: 0,
      zoomControl: false,
      attributionControl: false,
      center: [this.imageCenter.x, this.imageCenter.y],
    });
  }

  initImage() {
    let x = this.imageSizeMm.x;
    let y = this.imageSizeMm.y;
    let xCenter = 0;
    let yCenter = 0;

    xCenter = this.motorPostion.x;
    yCenter = this.motorPostion.y;

    let imageBounds = new L.LatLngBounds([
      [+y / 2 + yCenter, +x / 2 + xCenter],
      [-y / 2 + yCenter, -x / 2 + xCenter],
    ]);

    if (!this.image && this.map) {
      const timestamp = new Date().getTime();
      this.imageUrl = this.imageBaseUrl + timestamp.toString();
      this.image = L.imageOverlay(this.imageUrl, imageBounds, {
        opacity: 1,
        zIndex: 100,
      });
      this.image = this.image.addTo(this.map);
    }
    if (this.map) {
      let mapSize = this.map.getSize();
      let zoom = 0;
      if (mapSize.x / mapSize.y > x / y) {
        zoom = Math.log(mapSize.x / x) / Math.log(2);
      } else {
        zoom = Math.log(mapSize.y / y) / Math.log(2);
      }
      this.map.setZoom(zoom);
    }
  }

  initScale() {
    L.Control.Scale.include({
      _updateMetric: function(maxMeters: number) {
        let maxMilliMeters = maxMeters * 500,
          milliMeters = this._getRoundNum(maxMilliMeters),
          label =
            milliMeters < 500 ? milliMeters + " μm" : milliMeters / 500 + " mm";
        // console.log(this._mScale, label, milliMeters / maxMilliMeters);
        this._updateScale(this._mScale, label, milliMeters / maxMilliMeters);
      },
    });
    if (this.map) {
      L.control
        .scale({
          position: "topleft" as L.ControlPosition,
          maxWidth: 100,
          imperial: false,
        })
        .addTo(this.map);
    }
  }

  initToolBar() {
    if (this.map) {
      let editableLayers = new L.FeatureGroup();
      this.map.addLayer(editableLayers);

      let options: L.Control.DrawConstructorOptions = {
        position: "topright" as L.ControlPosition,
        draw: {
          polyline: {
            shapeOptions: {
              color: "red",
              weight: 5,
              opacity: 0.5,
            },
            maxPoints: 2,
            showLength: true,
            metric: true,
          },
          polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons
            drawError: {
              color: "#e1e100", // Color the shape will turn when intersects
              // message: "<strong>Oh snap!<strong> you can't draw that!", // Message that will show when intersect
            },
            shapeOptions: {
              color: "#bada55",
            },
          },
          circle: false, // Turns off this drawing tool
          rectangle: {
            shapeOptions: {
              clickable: false,
            } as L.PolylineOptions,
          },
          circlemarker: false,
          marker: false,
        },
        edit: {
          featureGroup: editableLayers,
        },
      };

      let drawControl = new L.Control.Draw(options);

      this.map.addControl(drawControl);
      this.map.on("draw:created", (e: any) => {
        editableLayers.addLayer(e.layer);
        if (e.layerType === "polyline" && this.map) {
          let start: L.LatLng = e.layer._latlngs[0];
          let end: L.LatLng = e.layer._latlngs[1];

          let lat = (start.lat + end.lat) / 2;
          let lng = (start.lng + end.lng) / 2;
          let d = Math.sqrt(
            Math.pow(start.lat - end.lat, 2) + Math.pow(start.lng - end.lng, 2)
          );
          L.popup({
            autoClose: false,
            keepInView: true,
            autoPan: true,
          })
            .setLatLng([lat, lng])
            .setContent(`<p>${(d * 1000).toFixed(3)} μm</p>`)
            .addTo(this.map);
        }
      });
    }
  }

  initRefreshImage() {
    if (this.image && this.map) {
      this.image.on("load", (ev: any) => {
        let t = ev.path[0].currentSrc.split("/");
        let imageName = t[t.length - 1];
        imageName = imageName.slice(0, imageName.length - 4);
        t = imageName.split("_");
        let x1 = 0,
          x2 = 0,
          y1 = 0,
          y2 = 0;
        y2 = parseFloat(t[1]);
        x2 = parseFloat(t[2]);
        y1 = parseFloat(t[3]);
        x1 = parseFloat(t[4]);

        let imageBounds = new L.LatLngBounds([
          [y2, x2],
          [y1, x1],
        ]);

        if (this.image) this.image.setBounds(imageBounds);
        const timeoutMs = 200;
        let timestamp = new Date().getTime();
        let timeGap = timestamp - this.imageLoadTime;
        this.imageLoadTime = timestamp;

        // this.imageLoadTime

        this.delayMs = this.delayMs + (timeoutMs - timeGap);
        if (this.delayMs < 0) this.delayMs = 0;
        this.timeId = window.setTimeout(() => {
          this.refreshImage();
        }, this.delayMs);
      });

      this.image.on("error", (ev: any) => {
        this.refreshImage();
      });
    }
  }

  refreshImage() {
    let t = new Date().getTime();
    t = t - this.mapFocusTime;
    if (t > config.liveViewTimeout) this.isImageUpdate = false;
    if (!this.isImageUpdate) return;

    if (this.rio && this.image) {
      const timestamp = new Date().getTime();
      this.imageRefreshTime = timestamp;
      this.calNewRio();

      if (this.rio.rioPixRange && this.rio.rioBounds) {
        let rioPixRangeUrl =
          this.rioBaseUrl +
          this.rio.rioPixRange.west +
          "-" +
          this.rio.rioPixRange.east +
          "-" +
          this.rio.rioPixRange.north +
          "-" +
          this.rio.rioPixRange.south +
          "-" +
          this.rio.scale +
          "-" +
          timestamp +
          "_" +
          this.rio.rioBounds.getNorth() +
          "_" +
          this.rio.rioBounds.getEast() +
          "_" +
          this.rio.rioBounds.getSouth() +
          "_" +
          this.rio.rioBounds.getWest() +
          ".jpg";
        this.getMotorPosition();
        if (this.isTouchStopped) this.image.setUrl(rioPixRangeUrl);
      }
    }
  }

  calNewRio() {
    if (this.map) {
      let rio: Rio = {
        mapZoom: this.map.getZoom(),
        mapBounds: this.map.getBounds(),
        mapCenter: this.map.getCenter(),
      };

      let pixPerUm = this.imageSizePixes.x / this.imageSizeMm.x;

      let mapNorth = rio.mapBounds.getNorth();
      let mapSouth = rio.mapBounds.getSouth();
      let mapEast = rio.mapBounds.getEast();
      let mapWest = rio.mapBounds.getWest();

      let rioNorth = this.motorPostion.y + this.imageSizeMm.y / 2;
      let rioSouth = this.motorPostion.y - this.imageSizeMm.y / 2;

      let rioEast = this.motorPostion.x + this.imageSizeMm.x / 2;
      let rioWest = this.motorPostion.x - this.imageSizeMm.x / 2;

      rioNorth = rioNorth <= mapNorth ? rioNorth : mapNorth;
      rioSouth = rioSouth >= mapSouth ? rioSouth : mapSouth;
      rioEast = rioEast <= mapEast ? rioEast : mapEast;
      rioWest = rioWest >= mapWest ? rioWest : mapWest;

      rio.rioBounds = new L.LatLngBounds([
        [rioNorth, rioEast],
        [rioSouth, rioWest],
      ]);

      rio.rioPixRange = {
        west: Math.round(
          (rioWest - this.motorPostion.x) * pixPerUm + this.imageSizePixes.x / 2
        ),
        east: Math.round(
          (rioEast - this.motorPostion.x) * pixPerUm + this.imageSizePixes.x / 2
        ),
        north: Math.round(
          (rioSouth - this.motorPostion.y) * pixPerUm +
            this.imageSizePixes.y / 2
        ),
        south: Math.round(
          (rioNorth - this.motorPostion.y) * pixPerUm +
            this.imageSizePixes.y / 2
        ),
      };

      let scale = 0;
      let zoom = rio.mapZoom - 10;
      if (zoom <= 2) scale = Math.pow(2, zoom - 2);
      else scale = 1;
      rio.scale = scale;
      this.rio = rio;
    }
  }

  initMapAction() {
    if (this.map) {
      this.map.on("move", () => {
        this.isTouchStopped = false;
        clearTimeout(this.timeId);
        this.timeId = window.setTimeout(() => {
          this.isTouchStopped = true;
          // this.calNewRio();
          this.refreshImage();
          this.changeMotorPosition();
        }, 10);
      });

      this.map.on("mousedown", (e: L.LeafletMouseEvent) => {
        // console.log(e.layerPoint.x);
        if (this.map) {
          let xSize = this.map.getSize().x;
          this.isTouchLeft = e.containerPoint.x < xSize / 8;
          this.isTouchRight = e.containerPoint.x > (7 * xSize) / 8;
          if (this.isTouchLeft || this.isTouchRight) {
            this.yTouchLast = e.containerPoint.y;
            this.map.dragging.disable();
            pStore.setState({
              isValueBarShow: true,
              isShutterTimeUpdate: this.isTouchLeft,
              isFocusZUpdate: this.isTouchRight,
            });
          } else {
            this.map.dragging.enable();
          }
        }
      });

      this.map.on("mouseup", (e: L.LeafletMouseEvent) => {
        if (this.map) {
          this.isTouchLeft = false;
          this.isTouchRight = false;
          // setTimeout(() => {
          pStore.setState({
            isValueBarShow: false,
          });
          // }, 500);

          this.map.dragging.enable();
        }
      });

      this.map.on("mousemove", (e: L.LeafletMouseEvent) => {
        if (!this.isTouchLocked) {
          this.isTouchLocked = true;
          setTimeout(() => {
            this.isTouchLocked = false;
          }, 100);
          if (!this.isImageUpdate) {
            this.setMapVideoOn(true);
            this.refreshImage();
          }
          let d = this.yTouchLast - e.containerPoint.y;
          this.yTouchLast = e.containerPoint.y;
          if (this.isTouchLeft) {
            let s0 = pStore.shutterTime + d * 0.1;
            let s1 = s0;
            s1 = s1 > 100 ? 100 : s1;
            s1 = s1 < 0 ? 0 : s1;

            let brightness =
              (s1 * (config.shutterTime.max - config.shutterTime.min)) / 100 +
              config.shutterTime.min;

            cameraApi.update({
              imgBrightness: brightness,
            });

            pStore.setState({
              shutterTime: s1,
            });
          }
          if (this.isTouchRight) {
            let s0 = pStore.focusZ + d * 0.1;
            let s1 = s0;
            s1 = s1 > 100 ? 100 : s1;
            s1 = s1 < 0 ? 0 : s1;

            let focusZ =
              (s1 * (config.focusZ.max - config.focusZ.min)) / 100 +
              config.focusZ.min;

            motorApi.goto({
              z: focusZ,
            });
            console.log(focusZ);

            pStore.setState({
              focusZ: s1,
            });
          }
        }
      });

      onfocus = () => {
        this.setMapVideoOn(true);
        this.refreshImage();
      };

      onblur = () => {
        this.setMapVideoOn(false);
      };

      EventBus.$on(EventAction.refreshMainMap, () => {
        if (this.map) this.refreshImage();
      });
      setTimeout(() => {
        let time = config.getTime();
        if (this.map) {
          if (
            time - this.imageRefreshTime > 1200 &&
            pStore.isMainMapImageUpdate
          ) {
            // console.log('refresh Image');
            this.refreshImage();
          }
        }
      }, 1000);
    }
  }

  setMapVideoOn(on: boolean) {
    if (on) {
      pStore.setState({ isMainMapImageUpdate: true });
      this.mapFocusTime = new Date().getTime();
      this.isImageUpdate = true;
    } else {
      this.isImageUpdate = false;
      pStore.setState({ isMainMapImageUpdate: false });
    }
  }

  changeMotorPosition() {
    if (this.map && this.image) {
      let mapBounds = this.map.getBounds();
      // console.log(mapBounds);

      let x = this.imageSizeMm.x;
      let y = this.imageSizeMm.y;
      let xCenter = this.imageCenter.x;
      let yCenter = this.imageCenter.y;
      let imageBounds = new L.LatLngBounds([
        [+y / 2 + yCenter, +x / 2 + xCenter],
        [-y / 2 + yCenter, -x / 2 + xCenter],
      ]);

      let xyMap0: Position = {
        x: mapBounds.getNorthEast().lng,
        y: mapBounds.getNorthEast().lat,
      };

      let xyMap1: Position = {
        x: mapBounds.getSouthWest().lng,
        y: mapBounds.getSouthWest().lat,
      };

      let xyImage0: Position = {
        x: imageBounds.getNorthEast().lng,
        y: imageBounds.getNorthEast().lat,
      };

      let xyImage1: Position = {
        x: imageBounds.getSouthWest().lng,
        y: imageBounds.getSouthWest().lat,
      };

      if (
        !(
          xyMap0.x < xyImage0.x &&
          xyMap0.y < xyImage0.y &&
          xyMap1.x > xyImage1.x &&
          xyMap1.y > xyImage1.y
        )
      ) {
        // console.log("need move");
        let mapCenter = this.map.getCenter();
        motorApi.goto({
          x: mapCenter.lng,
          y: mapCenter.lat,
        });
      }
    }
  }

  initFrewDraw() {
    // const freeDraw = new FreeDraw({ mode: FreeDraw.ALL });
    // if (this.map) this.map.addLayer(freeDraw);
  }
}
