<template>
  <div class="plate-bar-select-container">
    <div class="plate-swiper-wrap pt-5 pb-5 mt-5">
      <div class="ml-5 mb-3 title">容器选择</div>
      <plate-swiper-view />
    </div>

    <bottom-bar-view />
  </div>
</template>

<script lang="ts">
// import * as M from '@/models/MainMap.ts';
// import pStore from '@/store/preview.ts';
// import { MapAction } from '@/ts/modules/Preview';

import { Component, Vue } from "vue-property-decorator";
import BottomBarView from "@/views/components/bottom-bar.vue";
import PlateSwiperView from "@/views/plate/components/swiper.vue";

@Component({
  components: {
    BottomBarView,
    PlateSwiperView
  }
})
export default class PlateBarSelectView extends Vue {
  created() {}
  mounted() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.plate-bar-select-container {
  background-color: #f7f7f7;
  height: 100vh;
  .plate-swiper-wrap {
    background: #fff;
  }
}
</style>
