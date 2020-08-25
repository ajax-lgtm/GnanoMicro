<template>
  <div class="create-scan-container">
    <TopBarView title="创建测试" />
    <!-- <v-dialog> -->
    <div class="create-wrap mx-auto">
      <div class="mt-5 ml-3 title">
        <span>请选择容器</span>
      </div>
      <PlateSwiperView @plateChange="plateChange" class="mt-2" />
      <v-divider class="my-4"></v-divider>
      <div class="mt-5 ml-3 title">
        <span>请设置参数</span>
      </div>
      <ScanParamView class="mt-2" />
      <v-btn color="primary" class="btn mt-8" @click="createScan">确定</v-btn>
    </div>
    <!-- </v-dialog> -->
    <BottomBarView value="2" />
  </div>
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
export default class CreateScanView extends Vue {
  mounted() {}
  create() {}

  plateChange(plate: any) {
    console.log(plate);
  }

  createScan() {
    goto(this, "/preview");
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.create-scan-container {
  .create-wrap {
    width: 100%;
    max-width: 450px;
  }

  //   display: flex;
  //   flex-direction: column;
  //   align-content: center;
  //   align-items: center;
  //   background-color: red;
  .btn {
    width: 90%;
    max-width: 200px;
    margin-left: 50%;
    transform: translateX(-50%);
  }
}
</style>
