<template>
  <div class="container">
    <v-row align="center">
      <v-col class="text-center" cols="12" sm="3">
        <div class="my-2">
          <v-btn depressed small @click="snap">snap</v-btn>
        </div>
        <div class="my-2">
          <v-btn depressed small @click="list">list</v-btn>
        </div>
        <div class="my-2">
          <v-btn depressed small>delete</v-btn>
        </div>
        <div class="my-2">
          <v-btn depressed small>update</v-btn>
        </div>
      </v-col>
      <v-col class="text-center" cols="12" sm="9">
        <v-textarea
          solo
          name="input-7-4"
          label=""
          :value="responseStr"
        ></v-textarea
      ></v-col>
    </v-row>
    <img :src="snapImagePath" />
    <div v-for="image in imageList" v-bind:key="image.id">
      <img :src="image" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import * as config from '@/config/index';
import * as imageApi from '@/api/image';
import * as config from '@/config/index';

@Component
export default class XXX extends Vue {
  responseStr?: string = '';
  snapImagePath: string = '';
  imageList: string[] = [];

  scanId: number = config.scanId;

  mounted() {}
  create() {}

  async snap() {
    let snapImage = await imageApi.snap(this.scanId);

    if (snapImage.imageParam)
      this.snapImagePath = imageApi.getImagePath(snapImage.imageParam).M;
  }

  async list() {
    let image = await imageApi.list(this.scanId);
    if (image.imageList) {
      for (let i = 0; i < image.imageList.length; i++) {
        let imagePath = imageApi.getImagePath(image.imageList[i]);
        this.imageList.push(imagePath.S);
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
