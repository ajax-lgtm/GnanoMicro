export interface PlateViewData {
  url: string;
  name: string;
  company: string;
  partNum: string;
  comment: string;
  isFavorite: boolean;
}
export interface PlateParam {
  plateId: number;
  isHolePlates: boolean;
  features: Features;
  plateStyle: Style;
}

export interface NearestWell {
  isInWell: boolean;
  xNum: number;
  yNum: number;
  center: Point;
  rWell: number;
}

export interface Point {
  x: number;
  y: number;
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
  xOffset: number;
  yOffset: number;
  xHoleSize: number;
  yHoleSize: number;
  rHoleSize: number;
  imageUrl: string;
  border: Border;
  svgPath?: string;
  svgData?: string;
}

export interface Border {
  shape: string;
  points: number[][];
}

export interface Style {
  color: {
    total?: string;
    border?: string;
    well?: string;
    sideLabel?: string;
    wellLabel?: string;
  };
  weight: {
    border?: number;
    well?: number;
    sideLabel?: number;
    wellLabel?: number;
  };
  fillColor: {
    base?: string;
    well?: string;
  };
  offset: {
    xSideLabel?: number[];
    ySideLabel?: number[];
    wellLabel?: number[];
  };
}

export class Plate {
  plateParam: PlateParam;
  svg: string;

  constructor(plateParam: PlateParam) {
    this.plateParam = plateParam;
    this.svg = '';
  }

  generateSvg() {
    let p = this.plateParam.features;
    let s = this.plateParam.plateStyle;
    let svgStr = '';
    svgStr += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${p.xSize} ${p.ySize}">`;
    const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (s.color.total) {
      s.color.border = s.color.total;
      s.color.well = s.color.total;
      s.color.sideLabel = s.color.total;
      s.color.wellLabel = s.color.total;
    }
    if (!s.offset.xSideLabel) {
      s.offset.xSideLabel = [0, 0];
    }
    if (!s.offset.ySideLabel) {
      s.offset.ySideLabel = [0, 0];
    }
    if (!s.offset.wellLabel) {
      s.offset.wellLabel = [0, 0];
    }

    svgStr += `
  <style>
      .border{stroke: ${s.color.border ? s.color.border : 'green'};
        fill:  ${s.fillColor.well ? s.fillColor.well : 'transparent'};
        stroke-width: ${s.weight.border ? s.weight.border : 1};}
      .well{stroke: ${s.color.well ? s.color.well : 'green'};
        fill: ${s.fillColor.well ? s.fillColor.well : 'transparent'};
        stroke-width: ${s.weight.well ? s.weight.well : 0.2};}
      .small{fill:${
        s.color.wellLabel ? s.color.wellLabel : 'green'
      };text-anchor:middle;
        font-size:${s.weight.wellLabel ? s.weight.wellLabel : 2}px;}
      .big{fill:${
        s.color.sideLabel ? s.color.sideLabel : 'green'
      };text-anchor:middle;
        font-size:${s.weight.sideLabel ? s.weight.sideLabel : 6}px;}
  </style>
      `;
    svgStr += `<polyline class="border" points="1 87, 1 3, 125 3, 129 7, 129 87, 0.5 87"/>
  `;

    let xo = p.xSize / 2;
    let yo = p.ySize / 2;

    for (let x = 0; x < p.xHolesNum; x++) {
      let centerX = p.xOffset + (x - p.xHolesNum / 2 + 0.5) * p.xHoleSize;

      for (let y = 0; y < p.yHolesNum; y++) {
        let centerY = p.yOffset + (y - p.yHolesNum / 2 + 0.5) * p.yHoleSize;

        let xx = 0;
        let yy = 0;

        if (y === 0) {
          xx = xo + centerX + s.offset.ySideLabel[0];
          yy = yo + centerY + s.offset.ySideLabel[1];
          svgStr += `<text class="big" x="${xx.toFixed(3)}" y="${yy.toFixed(
            3
          )}">${x + 1}</text>
        `;
        }

        if (x === 0) {
          xx = xo + centerX + s.offset.xSideLabel[0];
          yy = yo + centerY + s.offset.xSideLabel[1];
          svgStr += `<text class="big" x="${xx.toFixed(3)}" y="${yy.toFixed(
            3
          )}">${ABC[y]}</text>
        `;
        }

        xx = xo + centerX + s.offset.wellLabel[0];
        yy = yo + centerY + s.offset.wellLabel[1];

        svgStr += `<text class="small" `;
        svgStr += ` x="${xx.toFixed(3)}" y="${yy.toFixed(3)}">${ABC[y]}${x +
          1}</text>
      `;

        xx = xo + centerX;
        yy = yo + centerY;

        svgStr += `<circle class="well" cx="${xx.toFixed(3)}" cy="${yy.toFixed(
          3
        )}" r="${p.rHoleSize}"/>
      `;
      }
    }

    svgStr += `</svg>`;
    return svgStr;
  }

  getWellCenters(): Point[] {
    let wellCenters: Point[] = [];
    let f = this.plateParam.features;

    for (let x = 0; x < f.xHolesNum; x++) {
      for (let y = 0; y < f.yHolesNum; y++) {
        let point: Point = this.wellNumToCenter(x, y);
        wellCenters.push(point);
      }
    }
    return wellCenters;
  }

  wellNumToCenter(xNum: number, yNum: number): Point {
    let center: Point = { x: 0, y: 0 };
    let f = this.plateParam.features;
    center.x =
      xNum * f.xHoleSize - (f.xOffset + f.xHoleSize * (f.xHolesNum / 2 - 0.5));
    center.y =
      -yNum * f.yHoleSize + (f.yOffset + f.yHoleSize * (f.yHolesNum / 2 - 0.5));

    return center;
  }

  getNearistWell(point: Point): NearestWell {
    let f = this.plateParam.features;

    let xNum = Math.round(
      (point.x - f.xOffset) / f.xHoleSize + f.xHolesNum / 2 - 0.5
    );
    xNum = xNum > -1 ? xNum : 0;
    xNum = xNum < f.xHolesNum ? xNum : f.xHolesNum;

    let yNum = Math.round(
      -(point.y - f.yOffset) / f.yHoleSize + f.yHolesNum / 2 - 0.5
    );
    yNum = yNum > -1 ? yNum : 0;
    yNum = yNum < f.yHolesNum ? yNum : f.yHolesNum;

    let nearestWell: NearestWell = {
      isInWell: false,
      xNum: xNum,
      yNum: yNum,
      center: {
        x: 0,
        y: 0
      },
      rWell: f.rHoleSize
    };

    nearestWell.center = this.wellNumToCenter(
      nearestWell.xNum,
      nearestWell.yNum
      // this.plateParam,
    );

    let d = Math.sqrt(
      Math.pow(point.x - nearestWell.center.x, 2) +
        Math.pow(point.y - nearestWell.center.y, 2)
    );

    nearestWell.isInWell = d < f.rHoleSize;

    return nearestWell;
  }
}
