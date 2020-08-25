<template>
  <div class="bottom-bar-container">
    <v-bottom-navigation :value="value" flat color="blue" class="bar">
      <v-btn @click="toHome">
        <span>首页</span>
        <v-icon>{{ iconHome }}</v-icon>
      </v-btn>

      <v-btn @click="toScan">
        <span>图库</span>
        <v-icon>{{ iconGallery }}</v-icon>
      </v-btn>

      <v-btn @click="toPreview">
        <span>观测</span>
        <v-icon>{{ iconSnap }}</v-icon>
      </v-btn>

      <v-btn @click="toSystem">
        <span>设置</span>
        <v-icon>{{ iconSystem }}</v-icon>
      </v-btn>

      <v-btn @click="toUser">
        <span>用户</span>
        <v-icon>{{ iconUser }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <ScanSelectorView ref="scanSelector"></ScanSelectorView>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ScanSelectorView from "@/views/scan/components/selector.vue";
import { icon } from "@/config/icon";

@Component({
  components: {
    ScanSelectorView
  }
})
export default class BottomBarView extends Vue {
  // mdiHomeIcon = mdiHome;
  iconHome = icon.mdiHomeOutline;
  iconGallery = icon.mdiImageMultiple;
  iconSnap = icon.mdiCamera;
  iconSystem = icon.mdiSettings;
  iconUser = icon.mdiAccount;

  isSelectorShow = false;

  @Prop() value!: 0;

  mounted() {}
  create() {}

  goto(toPath: string) {
    if (this.$route.path !== toPath)
      this.$router.push({
        path: toPath
      });
  }
  toHome() {
    this.goto("/");
  }
  toScan() {
    this.goto("/scan");
  }
  toPreview() {
    let ref: any = this.$refs.scanSelector;
    ref.isShow = true;
  }
  toSystem() {
    this.goto("/system");
  }
  toUser() {
    this.goto("/user");
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.bottom-bar-container {
  width: 100%;
  position: fixed;
  bottom: 0;
  // background-color: red;
}
</style>
