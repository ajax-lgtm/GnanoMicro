<template>
  <div class="total" id="total">
    <!-- <keep-alive> -->
    <main-map-view></main-map-view>
    <review-map-view></review-map-view>
    <top-bar-view />
    <bottom-bar-view />
    <value-bar-view />
    <thumb-gallery-view></thumb-gallery-view>
    <plate-map-view></plate-map-view>

    <!-- </keep-alive> -->
  </div>
</template>

<script lang="ts">
// import * as M from '@/models/MainMap.ts';
import pStore from "@/store/preview.ts";
// import { MapAction } from '@/ts/modules/Preview';

import { Component, Vue, Watch } from "vue-property-decorator";
import screenfull from "screenfull";

const PlateMapView = () => import("@/views/preview/components/plate-map.vue");
const MainMapView = () => import("@/views/preview/components/main-map.vue");
const ReviewMapView = () => import("@/views/preview/components/review-map.vue");

import TopBarView from "@/views/preview/components/top-bar.vue";
import BottomBarView from "@/views/preview/components/bottom-bar.vue";
import ValueBarView from "@/views/preview/components/value-bar.vue";
const ThumbGalleryView = () =>
  import("@/views/preview/components/thumb-gallery.vue");
// import preview from '@/store/preview.ts';
// import { MainMap } from '@/ts/modules/MainMap';

@Component({
  components: {
    TopBarView,
    BottomBarView,
    ValueBarView,
    ThumbGalleryView,
    PlateMapView,
    MainMapView,
    ReviewMapView
  }
})
export default class PreviewView extends Vue {
  // map?: MainMap;

  get isMainMapFullScreen() {
    return pStore.isMainMapFullScreen;
  }

  @Watch("isMainMapFullScreen")
  onChangeValue(newVal: boolean, oldVal: boolean) {
    if (document !== null) {
      if (screenfull.isEnabled) {
        if (!screenfull.isFullscreen) screenfull.toggle();
        else screenfull.exit();
      }
    }
  }

  created() {}
  mounted() {}
}
</script>

<style scoped>
.total {
  position: absolute;
  width: 100%;
  height: calc(100vh);
}
</style>
