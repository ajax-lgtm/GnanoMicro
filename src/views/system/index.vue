<template>
  <div class="system-container">
    <top-bar-view :title="'系统设置'" />
    <setting-card-view />
    <bottom-bar-view :value="3" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import TopBarView from "@/views/components/top-bar.vue";
import SettingCardView from "@/views/components/setting-card.vue";
import BottomBarView from "@/views/components/bottom-bar.vue";

@Component({
  components: {
    TopBarView,
    SettingCardView,
    BottomBarView
  }
})
export default class SystemView extends Vue {
  created() {}
  mounted() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.system-container {
  //   background-color: #f7f7f7;
  //   height: 100vh;
  .plate-swiper-wrap {
    background: #fff;
  }
}
</style>
