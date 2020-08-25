import * as imageApi from '@/api/image';

export interface GalleryThumbImages {
  imgUrl: string;
  comment: string;
  isVideo: boolean;
  snapTime: string;
  position: string;
}

export enum MapAction {
  SnapImage,
  ReviewImage,
  WaitRecord,
  Recording
}

export interface PreviewStates {
  isThumbGalleryShow?: boolean;
  isValueBarShow?: boolean;
  isSettingBarShow?: boolean;
  isMainMapImageUpdate?: boolean;
  isPlateMapShow?: boolean;
  isMainMapFullScreen?: boolean;
  isPlateMapFullScreen?: boolean;
  isCommentEditBarShow?: boolean;
  isAllBarHidden?: boolean;
  isMainMapHidden?: boolean;
  isReviewMapHidden?: boolean;
  scanId?: number;
  imageList?: imageApi.ImageParam[];
  mapAction?: MapAction;
  snapedImage?: imageApi.ImageParam;
  imageNum?: number;

  isShutterTimeUpdate?: boolean;
  shutterTime?: number;
  isFocusZUpdate?: boolean;
  focusZ?: number;
}
