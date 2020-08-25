<template>
  <div v-show="isShow" class="top">
    <div class="slide-container ml-2 mb-2">
      <v-icon dark class="slide-btn" @click="changeSliderState">
        {{
        sliderIcon
        }}
      </v-icon>

      <v-slider
        class="slide"
        min="0"
        :max="imageNum"
        v-model="sliderIndex"
        persistent-hint
        thumb-label="always"
      ></v-slider>
      <v-btn small class="close-icon" icon @click="closeThumbGallery">
        <v-icon small color="red">{{ icon.mdiCloseCircle }}</v-icon>
      </v-btn>
    </div>

    <div class="swiper-container" @snapImage="snapImage">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(image, index) in imageList" v-bind:key="index">
          <img
            v-lazy="imagePathList[index].S"
            class="thumb-image"
            @click="clickThumbImage(imageList[index])"
          />
          <div class="thumb-comment">{{ imageCreateTime(image.createTime) }}</div>

          <div class="thumb-title">{{ index }}-{{ image.well }}A3</div>
          <div class="video-btn" v-if="imageList[index].isVideo">
            <v-btn class="mx-2" small fab dark color="rgba(0,0,0,0.5)">
              <v-icon color="rgba(255,255,255,0.8)">{{ icon.mdiPlay }}</v-icon>
            </v-btn>
          </div>
          <!-- </v-card> -->
        </div>
      </div>
      <!-- <div class="swiper-pagination"></div> -->
    </div>
  </div>
</template>

<script lang="ts">
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import { Vue, Component, Watch } from "vue-property-decorator";
import * as configIcon from "@/config/icon";
import pStore from "@/store/preview.ts";
import * as imageApi from "@/api/image";
import { EventBus, EventAction } from "@/plugins/eventbus";
import { MapAction } from "@/ts/modules/Preview";
import * as config from "@/config/index";
import { getTimeGap } from "@/ts/common.ts";

enum SliderState {
  Time,
  Num,
  Abc
}

@Component
export default class Gallery extends Vue {
  icon = configIcon.icon;
  scanId: number = config.scanId;
  isFirstShow: boolean = true;
  SW?: Swiper;
  sliderIndex: number = 0;
  sliderState = SliderState.Time;
  sliderTicksLabels = ["A", "B", "C", "D"];

  imagePathList: imageApi.ImagePath[] = [];

  get imageList() {
    // console.log('get image list');
    // console.log(pStore.imageList);
    return pStore.imageList;
  }

  imageCreateTime(t: number) {
    return getTimeGap(t);
  }

  get imageNum() {
    // console.log(pStore.imageNum);
    return pStore.imageNum;
  }

  get sliderIcon() {
    switch (this.sliderState) {
      case SliderState.Time:
        return this.icon.mdiClock;
        break;
      case SliderState.Num:
        return this.icon.mdiNumber;
        break;
      case SliderState.Abc:
        return this.icon.mdiAbc;
        break;
      default:
        return this.icon.mdiClock;
        break;
    }
  }

  changeSliderState() {
    switch (this.sliderState) {
      case SliderState.Time:
        this.sliderState = SliderState.Num;
        break;
      case SliderState.Num:
        this.sliderState = SliderState.Abc;
        break;
      case SliderState.Abc:
        this.sliderState = SliderState.Time;
        break;
      default:
        break;
    }
  }

  @Watch("sliderIndex")
  onSliderChangeValue() {
    if (this.SW) {
      this.SW.slideTo(this.sliderIndex);
      // console.log(this.sliderIndex);
    }
    // debugger;
  }

  @Watch("imageList")
  onChangeValue(newVal: imageApi.ImageParam[], oldVal: imageApi.ImageParam[]) {
    if (this.SW) {
      this.imagePathList = [];
      for (let i = 0; i < this.imageList.length; i++) {
        this.imagePathList.push(imageApi.getImagePath(this.imageList[i]));
      }
      this.SW.update();
    }
  }

  get isShow() {
    if (pStore && pStore.isThumbGalleryShow) {
      return true;
    }
    return false;
  }

  closeThumbGallery() {
    pStore.setState({ isThumbGalleryShow: false });
  }

  silderMoveEnd(sliderValue: number) {
    // console.log(sliderValue);
    if (this.SW) this.SW.slideTo(sliderValue - 1);
  }

  snapImage() {
    // console.log('thumb-snapImage');
    // if (this.SW)
    //   this.SW.prependSlide('');
    // this.imageList.push();
  }

  created() {
    this.isFirstShow = true;
    pStore.setState({ imageList: [] });
  }

  clickThumbImage(image: any) {
    pStore.setState({
      mapAction: MapAction.ReviewImage,
      isReviewMapHidden: false,
      isMainMapHidden: true,
      isMainMapImageUpdate: false
    });
    // console.log(image);
    setTimeout(() => {
      EventBus.$emit(EventAction.reviewImage, image);
    }, 20);
  }

  mounted() {
    this.SW = new Swiper(".swiper-container", {
      width: 150,
      height: 120,
      autoHeight: true,
      spaceBetween: 10,
      setWrapperSize: true,
      speed: 100,
      centeredSlides: false,
      touchRatio: 1,
      initialSlide: 0,
      observer: true,
      observeParents: true,
      pagination: {
        el: ".swiper-pagination"
        // type: 'progressbar',
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });
    this.getImageList();

    EventBus.$on(EventAction.getImageList, () => {
      this.getImageList();
    });

    if (this.SW) {
      this.SW.on("slideChange", () => {
        if (this.SW) {
          // console.log(this.SW.activeIndex);
          this.sliderIndex = this.SW.activeIndex;
        }
      });
    }
  }

  async getImageList() {
    let r = await imageApi.list(this.scanId);
    // console.log('Receive EventAction.getImageList');
    // debugger;

    if (r.imageList) {
      // console.log(r.imageList);
      pStore.setState({ imageList: r.imageList, imageNum: r.imageList.length });
    }
  }
}
// debugger;
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.top {
  position: absolute;
  bottom: 60px;
  width: 100%;
  height: 140px;

  background: rgba(0, 0, 0, 0.5);
  // background: red;
  // position: absolute;

  .slide-container {
    position: relative;
    width: 100%;
    display: flex;
    top: 0;

    .slide-btn {
      flex: none;
      top: 4px;
    }
    .slide {
      margin-left: 5px;
      margin-right: 20px;
      flex: 1;
    }
  }
  .swiper-container {
    width: 100%;
    height: 140px;
    position: relative;
    margin-top: -30px;

    .swiper-wrapper {
      margin-top: -5px;
      // background-color: red;
      position: relative;
      .swiper-slide {
        .thumb-image {
          width: 150px;
          height: 100px;
          top: 0;
          margin: 0;
          padding: 0;
        }
        .thumb-comment {
          position: relative;
          top: -8px;
          width: fit-content;
          color: #ccc;
          margin: 0 auto;
          font-size: 12px;
        }
        .thumb-title {
          width: 50px;
          height: 20px;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          position: absolute;
          background-color: rgba(0, 0, 0, 0.5);
          // background-color: rgba(33, 150, 243, 0.8);
          text-align: center;
          border-radius: 4px;
          color: #eee;
          margin: 5px auto;
          font-size: 12px;
        }
        .video-btn {
          position: absolute;
          top: 45px;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
.close-icon {
  position: absolute;
  right: 5px;
  top: 2px;
  z-index: 20;
  min-width: 24px;
  // background-color: white;
}
</style>
