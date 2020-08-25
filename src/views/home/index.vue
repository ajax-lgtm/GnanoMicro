<template>
  <div class="home-container">
    <login-view />
    <bottom-bar-view :value="0" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginView from "@/views/components/login.vue";
import BottomBarView from "@/views/components/bottom-bar.vue";
// import { icon } from '@/config/icon';

@Component({
  components: {
    LoginView,
    BottomBarView
  }
})
export default class HomeView extends Vue {
  mounted() {}
  create() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.home-container {
  //   background-color: red;
}
</style>
