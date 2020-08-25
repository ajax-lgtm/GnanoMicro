<template>
  <div class="scan-list-container">
    <div v-for="(scan, index) in scans" v-bind:key="index" class="my-3">
      <scan-card-view :scan="scan"></scan-card-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { scanViewData } from "@/ts/data/scans";
import ScanCardView from "@/views/scan/components/card-h.vue";
import * as scanApi from "@/api/scan.ts";
// import { apiBaseUrl } from "@/config/index.ts";
// import { icon } from '@/config/icon';

@Component({
  components: {
    ScanCardView
  }
})
export default class ScanListView extends Vue {
  // scans = scanViewData;
  scans: scanApi.ScanParam[] = [];
  // baseUrl = apiBaseUrl;
  mounted() {
    this.getScanList();
  }
  create() {}

  async getScanList() {
    let r = await scanApi.list();
    if (r.scanList) this.scans = r.scanList;
    // console.log(this.scans);
    // debugger;
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.scan-list-container {
  // padding-top: 40px;
  // padding-bottom: 60px;
}
</style>
