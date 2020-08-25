export interface Plates {
  plates: Plate[];
}

export interface Plate {
  plateId: number;
  isHolePlates: boolean;
  features: Features;
}

export interface Features {
  plateName: string;
  company: string;
  comment: string;
  totalHoles: number;
  xSize: number;
  ySize: number;
  xHolesNum: number;
  yHolesNum: number;
  x0CenterOffset: number;
  y0CenterOffset: number;
  xHoleSize: number;
  yHoleSize: number;
  rHoleSize: number;
  imageUrl: string;
  border: Border;
}

export interface Border {
  shape: string;
  points: number[][];
}

import * as L from 'leaflet';
import { plates } from './plates';

export class PlateMap {
  map?: L.Map;
  plateId?: number;
  platesData?: Plates;
  borderLayer?: L.Layer;
  wellsLayer?: L.LayerGroup;
  labelLayer?: L.LayerGroup;
  // wells?:

  initPlatesFromJson(map?: L.Map, plateId?: number) {
    this.platesData = plates;
    this.map = map;
    this.plateId = plateId;
  }

  drawBorder() {
    if (this.platesData && this.map && this.plateId !== undefined) {
      let plateFeatures = this.platesData.plates[this.plateId].features;
      let plateBorder = plateFeatures.border;

      this.borderLayer = L.polygon(plateBorder.points as L.LatLngExpression[], {
        color: '#CCCCCC',
        weight: 3,
        opacity: 1,
        fill: false
      }).addTo(this.map);
    }
  }

  drawWells() {
    if (this.platesData && this.map && this.plateId !== undefined) {
      let plateFeatures = this.platesData.plates[this.plateId].features;

      this.wellsLayer = L.layerGroup().addTo(this.map);
      for (let x = 0; x < plateFeatures.xHolesNum; x++) {
        let centerX =
          plateFeatures.x0CenterOffset + x * plateFeatures.xHoleSize;
        for (let y = 0; y < plateFeatures.yHolesNum; y++) {
          let centerY =
            plateFeatures.y0CenterOffset - y * plateFeatures.yHoleSize;
          L.circle([centerY, centerX], {
            radius: plateFeatures.rHoleSize,
            color: '#cccccc',
            weight: 1,
            fill: false
          }).addTo(this.wellsLayer);
        }
      }
    }
  }

  drawLabels(zoom?: number) {
    if (this.platesData && this.map && this.plateId !== undefined) {
      let plateFeatures = this.platesData.plates[this.plateId].features;
      const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

      this.labelLayer = L.layerGroup().addTo(this.map);

      for (let x = 0; x < plateFeatures.xHolesNum; x++) {
        let centerX =
          plateFeatures.x0CenterOffset + x * plateFeatures.xHoleSize;

        for (let y = 0; y < plateFeatures.yHolesNum; y++) {
          let centerY =
            plateFeatures.y0CenterOffset - y * plateFeatures.yHoleSize;

          if (y === 0) {
            this.drawSvg(
              9,
              centerX,
              centerY + plateFeatures.yHoleSize / 1.8,
              `${x + 1}`,
              this.labelLayer
            );
          }

          if (x === 0) {
            this.drawSvg(
              9,
              centerX - plateFeatures.xHoleSize / 1.5,
              centerY,
              `${ABC[y]}`,
              this.labelLayer
            );
          }

          this.drawSvg(
            4,
            centerX + plateFeatures.xHoleSize / 2.2,
            centerY - plateFeatures.yHoleSize / 2.2,
            `${ABC[y]}${x + 1}`,
            this.labelLayer
          );
        }
      }
    }
  }

  updateLabels(zoom?: number) {
    if (this.labelLayer) this.labelLayer.remove();
    // console.log(zoom);
    this.drawLabels(zoom);
  }

  drawSvg(
    size: number,
    centerX: number,
    centerY: number,
    text: string,
    layer: L.LayerGroup
  ) {
    if (this.map) {
      let svgElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svgElement.setAttribute('viewBox', '0 0 100 100');
      svgElement.innerHTML = `<g>
      <text fill='#DDD' x='50' y='50' style='dominant-baseline:middle;text-anchor:middle;font-size:50'>${text}</text>
      </g>`;

      let svgElementBounds = [
        [centerY - size / 2, centerX - size / 2],
        [centerY + size / 2, centerX + size / 2]
      ];
      L.svgOverlay(
        svgElement,
        svgElementBounds as L.LatLngBoundsExpression
      ).addTo(layer);
    }
  }

  drawSvgPlate() {
    if (this.platesData && this.map && this.plateId !== undefined) {
      let plateFeatures = this.platesData.plates[this.plateId].features;
      const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

      let svgElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svgElement.setAttribute('viewBox', '0 0 130 90');
      svgElement.innerHTML = `<svg><style>
      .border{stroke: #CCC;fill: transparent;stroke-width: 1;}
      .well{fill: transparent;stroke: #DDD;stroke-width: 0.2;}
      .small{fill:#DDD;font-size:2px;text-anchor: middle;dominant-baseline: middle;}
      .big{text-anchor: middle;dominant-baseline: middle;fill:#DDD;font-size:6px;}
      </style>
      <polyline class="border" points="1 87, 1 3, 125 3, 129 7, 129 87, 0.5 87"/>
      `;

      for (let x = 0; x < plateFeatures.xHolesNum; x++) {
        let centerX =
          plateFeatures.x0CenterOffset + x * plateFeatures.xHoleSize;

        for (let y = 0; y < plateFeatures.yHolesNum; y++) {
          let centerY =
            plateFeatures.y0CenterOffset + y * plateFeatures.yHoleSize;

          if (y === 0) {
            svgElement.innerHTML += `<text class="big" x="${65 +
              centerX}" y="${45 +
              centerY -
              plateFeatures.yHoleSize / 1.3}">${x + 1}</text>`;
          }

          if (x === 0) {
            svgElement.innerHTML += `<text class="big" x="${65 +
              centerX -
              plateFeatures.xHoleSize / 1.3}" y="${45 + centerY}">${
              ABC[y]
            }</text>`;
          }

          svgElement.innerHTML += `<text class="small" x="${69 +
            centerX}" y="${48 + centerY}">${ABC[y]}${x + 1}</text>`;

          svgElement.innerHTML += `<circle class="well" cx="${65 +
            centerX}" cy="${45 + centerY}" r="4"/>`;
        }
      }

      svgElement.innerHTML += `</svg>`;

      let svgElementBounds = [
        [-45, -65],
        [45, 65]
      ];
      if (this.map)
        L.svgOverlay(
          svgElement,
          svgElementBounds as L.LatLngBoundsExpression
        ).addTo(this.map);
    }
  }

  drawPlateOnMap() {
    // this.drawBorder();
    // this.drawLabels();
    // this.drawWells();
    this.drawSvgPlate();
  }
}
