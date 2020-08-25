<template>
  <div class="create-scan-container">
    <v-dialog v-model="isShow" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">请选择测试模式</v-card-title>
        <v-card-text>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="isShow = false">自由观测</v-btn>
          <v-btn color="green darken-1" text @click="isShow = false">自动观测</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  isShow = true;
  mounted() {
    setTimeout(() => {
      this.isShow = false;
    }, 2000);
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.create-scan-container {
  background-color: red;
}
</style>
