import 'leaflet/dist/leaflet.css';
// import * as L from 'leaflet';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
// import * as config from '@/config/index';
// import { mdiPerspectiveMore } from '@mdi/js';
// import pStore from '@/store/preview.ts';
import { Map, MapImage } from './Map';
// import * as imageApi from '@/api/image';
// import FreeDraw from 'leaflet-freedraw';

export class ReviewMap extends Map {
  reviewImageLayer?: L.ImageOverlay;

  drawReviewImageOnMap(image: MapImage) {
    if (!this.reviewImageLayer) this.reviewImageLayer = this.drawImage(image);
    else this.drawImage(image, this.reviewImageLayer);
  }
}
