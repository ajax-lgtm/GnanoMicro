import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';

import { Position, Size } from './Common';
import { Point } from './plate';

export interface MapImage {
  size: Size;
  center: Position;
  url: string;
  zIndex?: number;
}

export class Map {
  map?: L.Map;

  init(mapId: string, mapOptions?: L.MapOptions) {
    this.map = L.map(mapId, {
      crs: L.CRS.Simple,
      minZoom: 0,
      maxZoom: 16,
      zoom: 10,
      zoomSnap: 1,
      zoomControl: false,
      attributionControl: false,
      center: [0, 0]
    });
  }

  drawImage(image: MapImage, imageLayer?: L.ImageOverlay) {
    // debugger;
    let imageBounds = new L.LatLngBounds([
      [+image.size.y / 2 + image.center.y, +image.size.x / 2 + image.center.x],
      [-image.size.y / 2 + image.center.y, -image.size.x / 2 + image.center.x]
    ]);

    if (this.map) {
      if (!imageLayer) {
        imageLayer = L.imageOverlay(image.url, imageBounds, {
          opacity: 1,
          zIndex: image.zIndex !== undefined ? image.zIndex : 1000
        }).addTo(this.map);
      } else {
        imageLayer.setBounds(imageBounds);
        imageLayer.setUrl(image.url);
      }
    }
    return imageLayer;
  }

  initScale() {
    L.Control.Scale.include({
      _updateMetric: function(maxMeters: number) {
        let maxMilliMeters = maxMeters * 500,
          milliMeters = this._getRoundNum(maxMilliMeters),
          label =
            milliMeters < 500 ? milliMeters + ' μm' : milliMeters / 500 + ' mm';
        // console.log(this._mScale, label, milliMeters / maxMilliMeters);
        this._updateScale(this._mScale, label, milliMeters / maxMilliMeters);
      }
    });
    if (this.map) {
      L.control
        .scale({
          position: 'topleft' as L.ControlPosition,
          maxWidth: 100,
          imperial: false
        })
        .addTo(this.map);
    }
  }

  initToolBar() {
    if (this.map) {
      let editableLayers = new L.FeatureGroup();
      this.map.addLayer(editableLayers);

      let options: L.Control.DrawConstructorOptions = {
        position: 'topright' as L.ControlPosition,
        draw: {
          polyline: {
            shapeOptions: {
              color: 'red',
              weight: 5,
              opacity: 0.5
            },
            maxPoints: 2,
            showLength: true,
            metric: true
          },
          polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons
            drawError: {
              color: '#e1e100' // Color the shape will turn when intersects
              // message: "<strong>Oh snap!<strong> you can't draw that!", // Message that will show when intersect
            },
            shapeOptions: {
              color: '#bada55'
            }
          },
          circle: false, // Turns off this drawing tool
          rectangle: {
            shapeOptions: {
              clickable: false
            } as L.PolylineOptions
          },
          circlemarker: false,
          marker: false
        },
        edit: {
          featureGroup: editableLayers
        }
      };

      let drawControl = new L.Control.Draw(options);

      this.map.addControl(drawControl);
      this.map.on('draw:created', (e: any) => {
        editableLayers.addLayer(e.layer);
        if (e.layerType === 'polyline' && this.map) {
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
            autoPan: true
          })
            .setLatLng([lat, lng])
            .setContent(`<p>${(d * 1000).toFixed(3)} μm</p>`)
            .addTo(this.map);
        }
      });
    }
  }

  getViewSize(): Size {
    let size: Size = { x: 1, y: 1 };
    if (this.map) {
      this.map.invalidateSize();

      size = {
        x: this.map.getSize().x,
        y: this.map.getSize().y
      };
      // let xMapSize = this.map.getSize().x;
      // let yMapSize = this.map.getSize().y;
    }
    return size;
  }

  setImageFitView(center: Point, imageSize: Size, isFitX: boolean = true) {
    // debugger;
    let viewSize = this.getViewSize();
    let zoom = 1;
    if (isFitX) zoom = viewSize.x / imageSize.x;
    else zoom = viewSize.y / imageSize.y;
    zoom = Math.log(zoom) / Math.log(2);
    // console.log(zoom);
    if (this.map) this.map.setView([center.y, center.x], zoom);
  }
}
