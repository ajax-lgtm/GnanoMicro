<template>
  <v-dialog v-model="isShow" max-width="400">
    <v-card class="py-6">
      <div class="content-wrap">
        <div class="mx-auto mt-3">
          <div class="ml-3 title">
            <span>请选择容器</span>
          </div>
          <PlateSwiperView @plateChange="plateChange" class="mt-2" />
          <div class="mt-5 ml-3 title">
            <span>请设置参数</span>
          </div>
          <ScanParamView class="mt-2" />
          <v-card-actions class="d-flex  justify-center mt-4">
            <v-btn color="primary darken-1" text @click="onClose">关闭</v-btn>
            <v-btn color="primary darken-1" text @click="onOk">确定</v-btn>
          </v-card-actions>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PlateSwiperView from "@/views/plate/components/swiper.vue";
import ScanParamView from "@/views/scan/components/param.vue";
import TopBarView from "@/views/components/top-bar.vue";
import BottomBarView from "@/views/components/bottom-bar.vue";
import { goto } from "@/ts/common.ts";
// import { icon } from '@/config/icon';

@Component({
  components: {
    PlateSwiperView,
    ScanParamView,
    TopBarView,
    BottomBarView
  }
})
export default class PlateParamView extends Vue {
  isShow = false;
  mounted() {}
  create() {}

  plateChange(plate: any) {
    console.log(plate);
  }

  onClose() {
    this.isShow = false;
  }

  onOk() {
    this.isShow = false;
    goto(this, "/preview");
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.content-wrap {
  widows: 90%;
  max-width: 350px;
  margin: auto;
}
</style>
