<template>
  <div class="bottom-bar" v-if="isShow" @snapimage="test">
    <v-app-bar dense dark color="rgba(0, 0, 0, 0.4)" flat>
      <v-btn icon @click="setGalleryThumbState">
        <v-badge v-if="imageNum" color="blue" :content="imageNum">
          <v-icon>{{ icon.mdiImageMultiple }}</v-icon>
        </v-badge>
        <v-icon v-if="!imageNum">{{ icon.mdiImageMultiple }}</v-icon>
      </v-btn>
      <v-btn icon @click="setPlateMapState">
        <v-icon>{{ icon.mdiMapMarkerPath }}</v-icon>
      </v-btn>

      <v-spacer></v-spacer>
      <div class="camera-btn" @click="centerButtonAction">
        <v-btn fab dark color="white" class="mb-2">
          <v-icon large color="black">{{ centerIcon }}</v-icon>
        </v-btn>
      </div>

      <div class="record-btn" :disabled="isCenterRightButtonDisable">
        <v-btn icon @click="centerRightButtonAction">
          <v-icon>{{ centerRightIcon }}</v-icon>
        </v-btn>
      </div>

      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>{{ icon.mdiDotsVertical }}</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>高清</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>普清</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>流畅</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn icon @click="fullScreen">
        <v-icon>{{ icon.mdiFullscreen }}</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- <selector-view isDialogShow="true"></selector-view> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import * as configIcon from "@/config/icon";
import * as config from "@/config/index";
// import * as config from '@/config/index';
import { MapAction } from "@/ts/modules/Preview";
import pStore from "@/store/preview.ts";
import { EventBus, EventAction } from "@/plugins/eventbus";
import * as imageApi from "@/api/image";

@Component
export default class BottomBar extends Vue {
  icon = configIcon.icon;
  isCenterRightButtonDisable: boolean = false;
  scanId = config.scanId;

  test() {
    // console.log('test');
  }

  created() {}

  mounted() {}

  get imageNum() {
    return pStore.imageNum;
  }

  get isShow() {
    return !pStore.isAllBarHidden;
  }

  get centerIcon() {
    let iconStr: string = this.icon.mdiCamera;
    switch (pStore.mapAction) {
      case MapAction.SnapImage:
        iconStr = this.icon.mdiCamera;
        break;
      case MapAction.ReviewImage:
        iconStr = this.icon.mdiClose;
        break;
      case MapAction.WaitRecord:
        iconStr = this.icon.mdiRecord;
        break;
      case MapAction.Recording:
        iconStr = this.icon.mdiStop;
        break;
      default:
        iconStr = this.icon.mdiVideo;
        break;
    }
    return iconStr;
  }

  get centerRightIcon() {
    let iconStr: string = this.icon.mdiVideo;

    switch (pStore.mapAction) {
      case MapAction.SnapImage:
        iconStr = this.icon.mdiVideo;
        break;
      case MapAction.ReviewImage:
        iconStr = this.icon.mdiCamera;
        break;
      case MapAction.WaitRecord:
        iconStr = this.icon.mdiCamera;
        break;
      case MapAction.Recording:
        iconStr = this.icon.mdiCamera;
        break;
      default:
        iconStr = this.icon.mdiVideo;
        break;
    }
    return iconStr;
  }

  fullScreen() {
    pStore.setState({ isMainMapFullScreen: !pStore.isMainMapFullScreen });
  }

  async snapImage() {
    // console.log(config.getTime());
    let r = await imageApi.snap(this.scanId);
    if (r.imageParam) {
      pStore.setState({
        snapedImage: r.imageParam,
        imageList: [r.imageParam].concat(pStore.imageList)
      });
    }
    if (r.imageNum) pStore.setState({ imageNum: r.imageNum });
    EventBus.$emit(EventAction.snapImage);
  }

  // async getImageList() {
  //   let r = await imageApi.list(this.scanId);
  //   if (r.list) pStore.setState({ imageList: r.list, imageNum: r.list.length });
  // }

  centerButtonAction() {
    switch (pStore.mapAction) {
      case MapAction.SnapImage:
        this.snapImage();
        break;
      case MapAction.ReviewImage:
        pStore.setState({
          mapAction: MapAction.SnapImage,
          isMainMapImageUpdate: true,
          isMainMapHidden: false,
          isReviewMapHidden: true,
          isThumbGalleryShow: false,
          isPlateMapShow: false
        });
        EventBus.$emit(EventAction.refreshMainMap);
        break;
      case MapAction.WaitRecord:
        pStore.setState({ mapAction: MapAction.Recording });
        this.isCenterRightButtonDisable = true;
        break;
      case MapAction.Recording:
        pStore.setState({ mapAction: MapAction.WaitRecord });
        break;
      default:
        break;
    }
  }

  centerRightButtonAction() {
    let tMapAction: MapAction = MapAction.SnapImage;
    if (pStore.mapAction === MapAction.SnapImage)
      tMapAction = MapAction.WaitRecord;
    else tMapAction = MapAction.SnapImage;
    pStore.setState({ mapAction: tMapAction });
  }

  async setGalleryThumbState() {
    let isThumbGalleryShow = !pStore.isThumbGalleryShow;
    pStore.setState({ isThumbGalleryShow: isThumbGalleryShow });
    if (!isThumbGalleryShow) {
      // debugger;
      // console.log('EventAction.getImageList');
      EventBus.$emit(EventAction.getImageList);
    }
  }

  setPlateMapState() {
    pStore.setState({ isPlateMapShow: !pStore.isPlateMapShow });
  }
}
</script>

<style scoped>
.bottom-bar {
  position: absolute;
  bottom: 0;
  z-index: 1;
  width: 100%;
  /* background: rgba(0, 0, 0, 0.3); */
}

.camera-btn {
  display: block;
  position: absolute;
  left: 50%;
  margin-left: -28px;
}

.record-btn {
  display: block;
  position: absolute;
  left: 50%;
  margin-left: 60px;
}
</style>
