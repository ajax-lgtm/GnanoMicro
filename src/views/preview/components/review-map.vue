<template>
  <div>
    <div id="review-map-id" class="map" v-show="isShow"></div>
    <v-btn
      fab
      dark
      small
      color="white"
      class="mr-2 show-btn"
      @click="hideAllBar"
    >
      <v-icon color="black">{{ eyeIcon }}</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
// import { MainMap } from '@/ts/modules/MainMap';
import { Component, Vue } from 'vue-property-decorator';
import * as configIcon from '@/config/icon';
import pStore from '@/store/preview.ts';
import { ReviewMap } from '@/ts/modules/ReviewMap';
import { EventBus, EventAction } from '@/plugins/eventbus';
import * as imageApi from '@/api/image';

@Component
export default class ReviewMapView extends Vue {
  icon = configIcon.icon;
  reviewMap: ReviewMap = new ReviewMap();

  get eyeIcon() {
    return pStore.isAllBarHidden ? this.icon.mdiEye : this.icon.mdiEyeOff;
  }

  hideAllBar() {
    pStore.setState({ isAllBarHidden: !pStore.isAllBarHidden });
  }

  get isShow() {
    return !pStore.isReviewMapHidden;
  }

  drawImageOnMap(image: imageApi.ImageParam) {
    let imageUrl = imageApi.getImagePath(image);
    // let imageCenter = { x: image.motorXPosition, y: image.motorYPosition };
    let imageCenter = { x: 0, y: 0 };
    let imageSize = { x: 0.3, y: 0.2 };
    this.reviewMap.drawReviewImageOnMap({
      size: imageSize,
      center: imageCenter,
      url: imageUrl.L,
    });

    // debugger;
    this.reviewMap.setImageFitView(imageCenter, imageSize);
  }

  mounted() {
    this.reviewMap.init('review-map-id');
    this.reviewMap.initScale();
    this.reviewMap.initToolBar();

    EventBus.$on(EventAction.reviewImage, (image: any) => {
      this.drawImageOnMap(image as imageApi.ImageParam);
    });
  }
}
</script>

<style scoped>
.map {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;

  background-color: black;
  z-index: 0;
}

.show-btn {
  position: fixed;
  right: 0;
  bottom: 80px;
}
</style>
