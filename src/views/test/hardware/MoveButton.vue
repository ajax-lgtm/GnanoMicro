<template>
  <div>
    <div class="button-container d-flex flex-row justify-space-between">
      <div class="xy-container d-flex flex-row">
        <div class="align-self-center mt-5">
          <v-btn color="primary">X-</v-btn>
        </div>
        <div class="d-flex flex-column  mx-2">
          <div>
            <v-btn color="primary">Y+</v-btn>
          </div>
          <div class="my-4">
            <v-btn color="error" class="px-2">STOP</v-btn>
          </div>
          <div>
            <v-btn color="primary">Y-</v-btn>
          </div>
        </div>
        <div class="align-self-center mt-5">
          <v-btn color="primary">X+</v-btn>
        </div>
      </div>
      <div class="z-container d-flex flex-column mr-2">
        <div>
          <v-btn color="primary" @click="zUp">Z+</v-btn>
        </div>
        <div class="my-4">
          <v-btn color="error px-2">STOP</v-btn>
        </div>
        <div>
          <v-btn color="primary">Z-</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class MoveButton extends Vue {
  mounted() {}
  create() {}
  zUp() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.button-container {
  width: 1000px;
  position: relative;
  left: 50%;
  transform: translateX(-500px);
  .xy-container {
    width: 140px;
    height: 120px;
  }
}
</style>
