<template>
  <div>
    <div class="scan-container">
      <img :src="imagePath" class="cam-img" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { apiBaseUrl } from "@/config/index";

@Component
export default class Scan extends Vue {
  imagePath = "";
  mounted() {
    setInterval(() => {
      // debugger;
      // let timestamp = new Date().getTime();
      // this.imagePath = apiBaseUrl + "/cam/image/" + timestamp.toString();
      // console.log(this.imagePath);
    }, 200);
  }
  create() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.scan-container {
  position: relative;
  height: 400px;
  width: 600px;
  left: 50%;
  transform: translateX(-300px);
  // border: grey 1px solid;
  // border-radius: 10px;
  .cam-img {
    width: 100%;
    height: 100%;
  }
}
</style>
