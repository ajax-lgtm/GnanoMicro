<template>
  <div class="plate-list-container">
    <div v-for="(plate, index) in plates" v-bind:key="index" class="my-5">
      <plate-card-view :plate="plate" :index="index" @deletePlateEvent="deletePlateEvent(index)"></plate-card-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PlateCardView from "@/views/plate/components/card.vue";
import * as plateApi from "@/api/plate.ts";

@Component({
  components: {
    PlateCardView
  }
})
export default class ScanListView extends Vue {
  // plates = plateViewData;
  plates: plateApi.PlateParam[] = [];
  mounted() {
    this.getPlateList();
  }
  create() {}

  deletePlateEvent(index: number) {
    this.plates.splice(index, 1);
  }

  async getPlateList() {
    let r = await plateApi.list();
    if (r.plateList) {
      this.plates = r.plateList;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.plate-list-container {
  //   background-color: red;
}
</style>
