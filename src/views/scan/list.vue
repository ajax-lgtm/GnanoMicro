<template>
  <div class="scan-container">
    <top-bar-view :title="'图库'" />
    <scan-list-view />
    <bottom-bar-view :value="1" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TopBarView from "@/views/components/top-bar.vue";
import BottomBarView from "@/views/components/bottom-bar.vue";
import ScanListView from "@/views/scan/components/list.vue";

@Component({
  components: {
    TopBarView,
    BottomBarView,
    ScanListView
  }
})
export default class ScanView extends Vue {
  created() {}
  mounted() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.scan-container {
  //   background-color: #f7f7f7;
}
</style>
