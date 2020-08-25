import {
  Module,
  VuexModule,
  getModule,
  Mutation
} from "vuex-module-decorators";
import store from "@/store";
import { PreviewStates, MapAction } from "@/ts/modules/Preview";
import * as imageApi from "@/api/image";

@Module({
  dynamic: true,
  namespaced: true,
  name: "PreviewState",
  store
})
class PreViewStateModule extends VuexModule {
  // previewState: PreviewStates = {
  isThumbGalleryShow: boolean = false;
  isValueBarShow: boolean = false;
  isSettingBarShow: boolean = false;
  isMainMapImageUpdate: boolean = true;
  isPlateMapShow: boolean = false;
  isMainMapFullScreen: boolean = false;
  isPlateMapFullScreen: boolean = false;
  isCommentEditBarShow: boolean = false;
  isAllBarHidden: boolean = false;
  isMainMapHidden: boolean = false;
  isReviewMapHidden: boolean = true;
  scanId: number = 0;
  imageList: imageApi.ImageParam[] = [];
  mapAction: MapAction = MapAction.SnapImage;
  snapedImage?: imageApi.ImageParam;
  imageNum: number = 0;
  isShutterTimeUpdate = false;
  shutterTime: number = 50;
  isFocusZUpdate = false;
  focusZ: number = 50;

  // };

  @Mutation
  setState(newState: PreviewStates) {
    if (newState.isThumbGalleryShow !== undefined)
      this.isThumbGalleryShow = newState.isThumbGalleryShow;
    if (newState.isValueBarShow !== undefined)
      this.isValueBarShow = newState.isValueBarShow;
    if (newState.isSettingBarShow !== undefined)
      this.isSettingBarShow = newState.isSettingBarShow;
    if (newState.isMainMapImageUpdate !== undefined)
      this.isMainMapImageUpdate = newState.isMainMapImageUpdate;
    if (newState.isPlateMapShow !== undefined)
      this.isPlateMapShow = newState.isPlateMapShow;
    if (newState.isMainMapFullScreen !== undefined)
      this.isMainMapFullScreen = newState.isMainMapFullScreen;
    if (newState.isPlateMapFullScreen !== undefined)
      this.isPlateMapFullScreen = newState.isPlateMapFullScreen;
    if (newState.isCommentEditBarShow !== undefined)
      this.isCommentEditBarShow = newState.isCommentEditBarShow;
    if (newState.isAllBarHidden !== undefined)
      this.isAllBarHidden = newState.isAllBarHidden;
    if (newState.isMainMapHidden !== undefined)
      this.isMainMapHidden = newState.isMainMapHidden;
    if (newState.isReviewMapHidden !== undefined)
      this.isReviewMapHidden = newState.isReviewMapHidden;
    if (newState.scanId !== undefined) this.scanId = newState.scanId;
    if (newState.imageList !== undefined) this.imageList = newState.imageList;
    if (newState.mapAction !== undefined) this.mapAction = newState.mapAction;
    if (newState.snapedImage !== undefined)
      this.snapedImage = newState.snapedImage;
    if (newState.imageNum !== undefined) this.imageNum = newState.imageNum;
    if (newState.shutterTime !== undefined)
      this.shutterTime = newState.shutterTime;
    if (newState.focusZ !== undefined) this.focusZ = newState.focusZ;
    if (newState.isFocusZUpdate !== undefined)
      this.isFocusZUpdate = newState.isFocusZUpdate;
    if (newState.isShutterTimeUpdate !== undefined)
      this.isShutterTimeUpdate = newState.isShutterTimeUpdate;
  }

  get states() {
    let nowState: PreviewStates = {
      isThumbGalleryShow: this.isThumbGalleryShow,
      isValueBarShow: this.isValueBarShow,
      isSettingBarShow: this.isSettingBarShow,
      isMainMapImageUpdate: this.isMainMapImageUpdate,
      isPlateMapShow: this.isPlateMapShow,
      isMainMapFullScreen: this.isMainMapFullScreen,
      isPlateMapFullScreen: this.isPlateMapFullScreen,
      isCommentEditBarShow: this.isCommentEditBarShow,
      isMainMapHidden: this.isMainMapHidden,
      isReviewMapHidden: this.isReviewMapHidden,
      isAllBarHidden: this.isAllBarHidden,
      scanId: this.scanId,
      imageList: this.imageList,
      mapAction: this.mapAction,
      snapedImage: this.snapedImage
    };
    return nowState;
  }
}

export default getModule(PreViewStateModule);
