<template>
  <div>
    <div class="input-container d-flex flex-row justify-space-between">
      <div class="mr-3">
        <div><span class="display-1">X</span></div>
        <div class="my-9"><span class="display-1">Y</span></div>
        <div><span class="display-1">Z</span></div>
      </div>

      <div>
        <div class="d-flex flex-row">
          <span class="mt-2 mr-2">Step</span>
          <v-text-field label="0.1" solo dense></v-text-field>
        </div>
        <div class="my-3 d-flex flex-row">
          <span class="mt-2 mr-2">Step</span>
          <v-text-field label="0.1" solo dense></v-text-field>
        </div>
        <div class="my-3 d-flex flex-row">
          <span class="mt-2 mr-2">Step</span>
          <v-text-field label="0.1" solo dense></v-text-field>
        </div>
      </div>

      <div>
        <div class="d-flex flex-row">
          <span class="mt-2 mr-2">Speed</span>
          <v-text-field label="0.1" solo dense></v-text-field>
        </div>
        <div class="my-3 d-flex flex-row">
          <span class="mt-2 mr-2">Speed</span>
          <v-text-field label="0.1" solo dense></v-text-field>
        </div>
        <div class="d-flex flex-row">
          <span class="mt-2 mr-2">Speed</span>
          <v-text-field label="0.1" solo dense></v-text-field>
        </div>
      </div>

      <div>
        <div class="d-flex flex-row">
          <span class="mt-2 mr-2">Position</span>
          <v-text-field label="0.1" solo dense></v-text-field>
        </div>
        <div class="my-3 d-flex flex-row">
          <span class="mt-2 mr-2">Position</span>
          <v-text-field label="0.1" solo dense></v-text-field>
        </div>
        <div class="d-flex flex-row">
          <span class="mt-2 mr-2">Position</span>
          <v-text-field label="0.1" solo dense></v-text-field>
        </div>
      </div>

      <div class="ml-4">
        <div>
          <v-btn color="primary">Goto</v-btn>
        </div>
        <div>
          <v-btn color="primary" class="my-10">Goto</v-btn>
        </div>
        <div>
          <v-btn color="primary">Goto</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Bottom",
});
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.input-container {
  width: 1000px;
  position: relative;
  left: 50%;
  transform: translateX(-500px);
}
</style>
