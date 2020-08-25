<template>
  <div class="top-bar-container">
    <!-- <v-card color="grey lighten-4" flat height="200px" tile> -->
    <v-toolbar flat dense color="blue">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <!-- </v-card> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
// import { icon } from '@/config/icon';

@Component
export default class TopBarView extends Vue {
  @Prop() title!: "";
  mounted() {}
  create() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.top-bar-container {
  //   background-color: red;
  // position: fixed;
  // top: 0;
  width: 100%;
}
</style>
