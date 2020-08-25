<template>
  <div class="create-scan-container">
    <PlateSwiperView />
    <ScanParamView />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PlateSwiperView from "@/views/plate/components/swiper.vue";
import ScanParamView from "@/views/scan/components/param.vue";
// import { icon } from '@/config/icon';

@Component({
  components: {
    PlateSwiperView,
    ScanParamView
  }
})
export default class CreateScanView extends Vue {
  mounted() {}
  create() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.create-scan-container {
  background-color: red;
}
</style>
