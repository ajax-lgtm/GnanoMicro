import * as L from "leaflet";

// export const apiBaseUrl = "http://101.133.136.44:5000/v1";
export const apiBaseUrl = "http://192.168.8.101:5000/v1";
// export const apiBaseUrl = 'http://192.168.3.8:5000/v1';
export const imageStreamBaseUrl = "http://192.168.8.101:5000/v1/cam";
// export const imageStreamBaseUrl = 'http://192.168.3.8:5000/v1/vcam';
// export const imageStreamBaseUrl = 'http://101.133.136.44:5000/v1/vcam';
// export const imageDataBaseUrl = "http://101.133.136.44/data";
export const imageDataBaseUrl = "http://192.168.8.101/data";
export const timeOutMs = 2000;
export const liveViewTimeout = 100000;

export const scanId = 2;

export const motorMarkIcon = L.icon({
  iconUrl: "/image/motorMarker.png",
  iconSize: [16, 16],
  iconAnchor: [8, 16],
  popupAnchor: [0, -12],
});

export const targetMarkIcon = L.icon({
  iconUrl: "/image/gps-fixed.png",
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  popupAnchor: [0, -6],
});

export function getTime() {
  return new Date().getTime();
}

export const defaultPlateType = [
  "4孔板",
  "6孔板",
  "12孔板",
  "24孔板",
  "48孔板",
  "96孔板",
  "384孔板",
  "2寸培养皿",
  "4寸培养皿",
];

export const shutterTime = {
  max: 100,
  min: 5,
};

export const focusZ = {
  max: 100,
  min: 0,
};

export const imageSizeMm = { x: 0.6, y: 0.4 };
export const imageSizePixes = { x: 1536, y: 1024 };
