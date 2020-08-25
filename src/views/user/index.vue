<template>
  <div class="user-container">
    <top-bar-view :title="'用户'" />
    <user-list-view />
    <bottom-bar-view :value="4" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TopBarView from "@/views/components/top-bar.vue";
import BottomBarView from "@/views/components/bottom-bar.vue";
import UserListView from "@/views/components/user-list.vue";

@Component({
  components: {
    TopBarView,
    BottomBarView,
    UserListView
  }
})
export default class ScanView extends Vue {
  created() {}
  mounted() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.user-container {
  //   background-color: #f7f7f7;
}
</style>
