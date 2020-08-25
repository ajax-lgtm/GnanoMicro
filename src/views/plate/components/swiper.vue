<template>
  <div v-show="isShow">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(plate, index) in plates" v-bind:key="index">
          <plate-card-view :plate="plate"></plate-card-view>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import { Vue, Component } from "vue-property-decorator";
// import { plateViewData } from "@/ts/data/plates";
import PlateCardView from "@/views/plate/components/card.vue";
import * as plateApi from "@/api/plate.ts";

@Component({
  components: {
    PlateCardView
  }
})
export default class Gallery extends Vue {
  isFirstShow: boolean = true;
  SW?: Swiper;
  plates: plateApi.PlateParam[] = [];

  get isShow() {
    return true;
  }

  created() {
    this.isFirstShow = true;
  }

  create() {}

  async getPlateList() {
    let r = await plateApi.list();
    if (r.plateList) {
      this.plates = r.plateList;
    }
  }

  mounted() {
    this.SW = new Swiper(".swiper-container", {
      on: {
        transitionEnd: () => {
          if (this.SW) {
            // console.log(this.SW.activeIndex);
            this.$emit("plateChange", this.plates[this.SW.activeIndex]);
          }
        }
      },
      slidesPerView: 1,
      pagination: {
        el: ".swiper-pagination"
      }
    });
    this.getPlateList();
  }
}
// debugger;
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.swiper-container {
  .swiper-pagination {
    position: relative;
    bottom: -6px;
  }
}
</style>
