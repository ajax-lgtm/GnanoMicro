import * as L from "leaflet";
import * as Plate from "./Plate";
import { MotorPosition } from "@/ts/modules/motor";
// import { plateData } from '@/ts/data/Plate';
import * as config from "@/config/index";
// import * as configIcon from '@/config/icon';
import { ImageParam, getImagePath } from "@/api/image";
import { EventBus, EventAction } from "@/plugins/eventbus";
import pStore from "@/store/preview.ts";
import { MapAction } from "@/ts/modules/Preview";

export class PlateMap {
  map?: L.Map;
  plate?: Plate.Plate;
  // plateId?: number;
  platesData?: Plate.PlateParam;
  borderLayer?: L.Layer;
  wellsLayer?: L.LayerGroup;
  nearestWellLayer?: L.Layer;
  // labelLayer?: L.LayerGroup;
  // wells?:
  motorMarker?: L.Marker;
  targetMarker?: L.Marker;
  motorMarkPopup?: L.Layer;
  userMark?: L.Layer;
  motorPosition?: MotorPosition;

  initPlatesFromJson(map: L.Map, platesData: Plate.PlateParam) {
    this.platesData = platesData;
    this.map = map;
    this.plate = new Plate.Plate(this.platesData);
  }

  drawBorder() {
    if (this.platesData && this.map) {
      let plateFeatures = this.platesData.features;
      let plateBorder = plateFeatures.border;

      this.borderLayer = L.polygon(plateBorder.points as L.LatLngExpression[], {
        color: "#00CC00",
        weight: 3,
        opacity: 1,
        fill: false
      }).addTo(this.map);
    }
  }

  drawWells() {
    if (this.platesData && this.map) {
      let plateFeatures = this.platesData.features;

      this.wellsLayer = L.layerGroup().addTo(this.map);
      for (let x = 0; x < plateFeatures.xHolesNum; x++) {
        let centerX = plateFeatures.xOffset + x * plateFeatures.xHoleSize;
        for (let y = 0; y < plateFeatures.yHolesNum; y++) {
          let centerY = -plateFeatures.yOffset - y * plateFeatures.yHoleSize;
          L.circle([centerY, centerX], {
            radius: plateFeatures.rHoleSize,
            color: "#0C0",
            weight: 1,
            fill: false
          }).addTo(this.wellsLayer);
        }
      }
    }
  }

  drawSvgPlate() {
    if (this.platesData && this.plate) {
      let svgStr = this.plate.generateSvg();
      let svgElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      svgElement.innerHTML += svgStr;

      let svgElementBounds = [
        [
          -this.platesData.features.ySize / 2,
          -this.platesData.features.xSize / 2
        ],
        [
          +this.platesData.features.ySize / 2,
          +this.platesData.features.xSize / 2
        ]
      ];

      if (this.map)
        L.svgOverlay(
          svgElement,
          svgElementBounds as L.LatLngBoundsExpression
        ).addTo(this.map);
    }
  }

  initMotorPostionMark(): L.Marker | undefined {
    let myIcon = config.motorMarkIcon;
    let r = undefined;
    if (this.map) {
      this.motorMarker = L.marker([0, 0], {
        icon: myIcon,
        zIndexOffset: 100
      }).addTo(this.map);
      r = this.motorMarker;
    }
    return r;
  }

  updateMotorPositionMark(
    motorPosition?: MotorPosition,
    motorPositonElement?: HTMLElement
  ) {
    if (this.motorMarker && motorPosition) {
      if (motorPosition.x !== undefined && motorPosition.y !== undefined) {
        this.motorMarker.setLatLng([motorPosition.y, motorPosition.x]);
        if (this.map) {
          let motorPostionPoint = this.map.latLngToContainerPoint([
            motorPosition.y,
            motorPosition.x
          ]);
          // console.log(motorPostionPoint);
          // console.log(motorPositonElement);
          if (motorPositonElement) {
            motorPositonElement.style.left =
              motorPostionPoint.x.toString() + "px";
            motorPositonElement.style.top =
              (motorPostionPoint.y - 16).toString() + "px";
          }
        }
      }
    }
  }

  drawPlateOnMap() {
    this.drawSvgPlate();
  }

  drawNearestWellOnMap(nearestWell: Plate.NearestWell) {
    if (this.platesData && this.map) {
      let f = this.platesData.features;

      this.nearestWellLayer = L.circle(
        [nearestWell.center.y, nearestWell.center.x],
        {
          radius: f.rHoleSize,
          stroke: false,
          fill: true,
          fillColor: "yellow",
          fillOpacity: 0.6
        }
      ).addTo(this.map);
    }
  }

  drawMotorMarkerOnMap(positon: L.LatLngExpression) {
    let myIcon = config.motorMarkIcon;
    if (this.map) {
      L.marker(positon, {
        icon: myIcon
      }).addTo(this.map);
    }
  }

  drawTargetMarkerOnMap(positon: Plate.Point, isNearest = false): Plate.Point {
    let myIcon = config.targetMarkIcon;

    if (this.map) {
      if (isNearest && this.plate) {
        let nearestWell = this.plate.getNearistWell(positon);
        positon = nearestWell.center;
      }
      let x = positon.x.toFixed(3);
      let y = positon.y.toFixed(3);
      let popContent = `目标位置:<br>X = ${x} mm</br>Y = ${y} mm`;
      // popContent += `<br><img class="popup-goto-btn" src='/image/goto.svg'>`;
      if (this.targetMarker) {
        this.targetMarker
          .setLatLng([positon.y, positon.x])
          .setPopupContent(popContent);
        // .openPopup();
      } else {
        this.targetMarker = L.marker([positon.y, positon.x], {
          icon: myIcon
        })
          .addTo(this.map)
          .bindPopup(popContent)
          .openPopup();
      }
    }
    return positon;
  }

  drawImageOnMap(
    image: ImageParam,
    center?: Plate.Point
  ): L.ImageOverlay | undefined {
    if (this.map) {
      if (center === undefined) center = { x: 0, y: 0 };
      let x = 0.3;
      let y = 0.2;
      let imageUrl = getImagePath(image).S;
      let imageBounds = new L.LatLngBounds([
        [+y / 2 + center.y, +x / 2 + center.x],
        [-y / 2 + center.y, -x / 2 + center.x]
      ]);
      let imageL = L.imageOverlay(imageUrl, imageBounds, {
        opacity: 1,
        zIndex: 1000,
        interactive: true
      }).addTo(this.map);
      return imageL;
    } else return undefined;
  }

  drawImageListOnMap(imageList: ImageParam[]) {
    // debugger;
    if (this.map && this.plate) {
      let centers = this.plate.getWellCenters();
      for (let i = 0; i < imageList.length && i < centers.length; i++) {
        let imageLayer = this.drawImageOnMap(
          imageList[i],
          centers[i % centers.length]
        );
        if (imageLayer) {
          imageLayer.on("click", () => {
            pStore.setState({
              mapAction: MapAction.ReviewImage,
              isReviewMapHidden: false,
              isMainMapHidden: true,
              isMainMapImageUpdate: false
            });
            // console.log(image);
            setTimeout(() => {
              EventBus.$emit(EventAction.reviewImage, imageList[i]);
            }, 20);
          });
        }
      }
    }
  }
}
