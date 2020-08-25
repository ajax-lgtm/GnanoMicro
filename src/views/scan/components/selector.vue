<template>
  <div class="selector-container">
    <v-row justify="center">
      <v-dialog v-model="isShow" max-width="400">
        <v-card class="px-8 py-4">
          <div v-if="!isTesting" class="pt-4">
            <div class="title">观测模式</div>
            <v-divider></v-divider>
            <v-card-text class="py-0">
              <v-radio-group v-model="modeSelect" column>
                <v-radio label="自由观测" value="freeTest"></v-radio>
                <v-radio label="自动测试" value="autoTest"></v-radio>
              </v-radio-group>
            </v-card-text>
            <div class="mt-4 title">共享权限</div>
            <v-divider></v-divider>
            <v-card-text class="mt-0">
              <v-checkbox
                v-model="isShareView"
                label="查看"
                value="share"
                hide-details
                class="my-0"
              ></v-checkbox>
              <v-checkbox
                v-model="isShareSnap"
                label="拍照"
                value="share"
                hide-details
                class="my-0"
              ></v-checkbox>
              <v-checkbox
                v-model="isShareMove"
                label="移动位置"
                value="share"
                hide-details
                class="my-0"
              ></v-checkbox>
            </v-card-text>
          </div>
          <div v-if="isTesting">
            <v-card-title></v-card-title>
            <v-card-text v-if="isShared">
              当前xxx正在使用设备进行xxx细胞观测，是否加入？
            </v-card-text>
            <v-card-text v-if="!isShared">
              当前xxx正在使用设备进行xxx细胞观测并设置为非共享，无法同时观测，请与之联系！
            </v-card-text>
          </div>
          <v-divider></v-divider>
          <v-card-actions class="d-flex  justify-center mt-4">
            <v-btn color="primary darken-1" text @click="onClose">关闭</v-btn>
            <v-btn color="primary darken-1" text @click="onOk">确定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <PlateParam ref="plateParam"></PlateParam>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import dStore from "@/store/device.ts";
import { deviceStates } from "@/ts/data/device.ts";
import PlateParam from "@/views/scan/components/plate-param.vue";
// import { icon } from '@/config/icon';

@Component({
  components: {
    PlateParam
  }
})
export default class SelectorView extends Vue {
  isScaning = false;
  isShow = false;
  modeSelect = "freeTest";
  isShare: string[] = ["share"];
  isShareView = true;
  isShareSnap = true;
  isShareMove = true;

  mounted() {
    dStore.setState(deviceStates);
  }
  create() {}

  get isTesting() {
    return dStore.isFreeTesting || dStore.isAutoTesting;
  }

  get isShared() {
    return dStore.isShared;
  }

  @Watch("modeSelect")
  onChange() {
    console.log(this.modeSelect);
    console.log(this.isShare);
  }

  goto(toPath: string) {
    if (this.$route.path !== toPath)
      this.$router.push({
        path: toPath
      });
  }

  onClose() {
    this.isShow = false;
  }

  onOk() {
    this.isShow = false;
    let ref: any = this.$refs.plateParam;
    ref.isShow = true;
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
