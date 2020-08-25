<template>
  <v-app class="app">
    <v-content class="scan">
      <Scan />
    </v-content>
    <v-content class="movebutton">
      <div class="button-container d-flex flex-row justify-space-between">
        <div class="xy-container d-flex flex-row">
          <div class="align-self-center mt-5">
            <v-btn color="primary" @click="xUp">X-</v-btn>
          </div>
          <div class="d-flex flex-column  mx-2">
            <div>
              <v-btn color="primary" @click="yUp">Y+</v-btn>
            </div>
            <div class="my-4">
              <v-btn color="error" class="px-2">STOP</v-btn>
            </div>
            <div>
              <v-btn color="primary" @click="yDown">Y-</v-btn>
            </div>
          </div>
          <div class="align-self-center mt-5">
            <v-btn color="primary" @click="xDown">X+</v-btn>
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
            <v-btn color="primary" @click="zDown">Z-</v-btn>
          </div>
        </div>
      </div>
    </v-content>
    <v-content class="bottom">
      <div class="input-container d-flex flex-row justify-space-between">
        <div class="mr-3">
          <div><span class="display-1">X</span></div>
          <div class="my-9"><span class="display-1">Y</span></div>
          <div><span class="display-1">Z</span></div>
        </div>

        <div>
          <div class="d-flex flex-row">
            <span class="mt-2 mr-2">Step</span>
            <v-text-field v-model="step.x" solo dense></v-text-field>
          </div>
          <div class="my-3 d-flex flex-row">
            <span class="mt-2 mr-2">Step</span>
            <v-text-field v-model="step.y" solo dense></v-text-field>
          </div>
          <div class="my-3 d-flex flex-row">
            <span class="mt-2 mr-2">Step</span>
            <v-text-field v-model="step.z" solo dense></v-text-field>
          </div>
        </div>

        <div>
          <div class="d-flex flex-row">
            <span class="mt-2 mr-2">Speed</span>
            <v-text-field v-model="speed.x" solo dense></v-text-field>
          </div>
          <div class="my-3 d-flex flex-row">
            <span class="mt-2 mr-2">Speed</span>
            <v-text-field v-model="speed.y" solo dense></v-text-field>
          </div>
          <div class="d-flex flex-row">
            <span class="mt-2 mr-2">Speed</span>
            <v-text-field v-model="speed.z" solo dense></v-text-field>
          </div>
        </div>

        <div>
          <div class="d-flex flex-row">
            <span class="mt-2 mr-2">Position</span>
            <v-text-field v-model="pos.x" solo dense></v-text-field>
          </div>
          <div class="my-3 d-flex flex-row">
            <span class="mt-2 mr-2">Position</span>
            <v-text-field v-model="pos.y" solo dense></v-text-field>
          </div>
          <div class="d-flex flex-row">
            <span class="mt-2 mr-2">Position</span>
            <v-text-field v-model="pos.z" solo dense></v-text-field>
          </div>
        </div>

        <div class="ml-4">
          <div>
            <v-btn color="primary" @click="xGoto">Goto</v-btn>
          </div>
          <div>
            <v-btn color="primary" @click="yGoto">Goto</v-btn>
          </div>
          <div>
            <v-btn color="primary" @click="zGoto">Goto</v-btn>
          </div>
        </div>
      </div>
    </v-content>
  </v-app>
</template>

<script lang="ts">
// import { conduitApi } from "@/api/common";
// import * as config from "@/config";

import { Component, Vue } from "vue-property-decorator";
import MoveButton from "./MoveButton.vue";
import Bottom from "./Bottom.vue";
import Scan from "./Scan.vue";

import * as motorApi from "@/api/motor.ts";

// import { apiBaseUrl } from "@/config/index";

@Component({
  components: {
    MoveButton,
    Bottom,
    Scan
  }
})
export default class CreateScanView extends Vue {
  // zStep = 0.2;

  step: motorApi.MotorData = { x: 1, y: 1, z: 1 };
  speed: motorApi.MotorData = { x: 1, y: 1, z: 1 };
  pos: motorApi.MotorData = { x: 0, y: 0, z: 0 };

  mounted() {
    setInterval(() => {
      this.getPos();
    }, 200);
  }
  create() {}

  async getPos() {
    // this.pos = await motorApi.getPosition(["X", "Y", "Z"]);
  }

  xUp() {
    motorApi.move({
      x: this.step.x
    });
  }

  xDown() {
    let xStep = this.step.x ? this.step.x : 0;
    motorApi.move({
      x: -xStep
    });
  }

  yUp() {
    motorApi.move({
      y: this.step.y
    });
  }

  yDown() {
    let yStep = this.step.y ? this.step.y : 0;
    motorApi.move({
      y: yStep
    });
  }

  zUp() {
    console.log(this.step.z);
    motorApi.move({
      z: this.step.z
    });
  }

  zDown() {
    let zStep = this.step.z ? this.step.z : 0;
    motorApi.move({
      z: zStep
    });
  }

  xGoto() {
    let xPos = this.pos.x ? this.pos.x : 0;
    motorApi.goto({
      x: xPos
    });
  }
  yGoto() {
    let xPos = this.pos.y ? this.pos.y : 0;
    motorApi.goto({
      x: xPos
    });
  }
  zGoto() {
    let xPos = this.pos.z ? this.pos.z : 0;
    motorApi.goto({
      x: xPos
    });
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app {
  width: 100%;
  height: 100%;
  .scan {
    position: relative;
    top: 10px;
  }
  .movebutton {
    position: relative;
    top: 60px;
  }
  .bottom {
    position: relative;
    top: 20px;
  }
}
</style>
