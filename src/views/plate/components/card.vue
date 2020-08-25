<template>
  <div class="plate-container mx-auto">
    <div class="plate-card mx-auto pa-3">
      <div class="left">
        <div class="plate-image">
          <img :src="plate.imageUrl" />
        </div>
        <div class="plate-name">
          <div>
            <img src="@/assets/icon/plate.svg" />
          </div>
          <div class="black--text body-1 ml-2">{{ plate.plateName }}</div>
        </div>
      </div>

      <div class="plate-info mx-3 my-1 body-2 grey--text text-lighten-1">
        <div class="param">
          <div class="header">厂商</div>
          <div class="black--text">{{ plate.company }}</div>
        </div>
        <div class="param">
          <div class="header">型号</div>
          <div class="black--text">{{ plate.partNum }}</div>
        </div>
        <div class="param">
          <div class="header">备注</div>
          <div class="black--text">{{ plate.comment }}</div>
        </div>
      </div>
      <div class="icon-p">
        <v-btn icon class="mr-1">
          <v-icon size="18" @click="onClickBuy">{{ iconShoping }}</v-icon>
        </v-btn>
        <v-btn icon class="mr-1">
          <v-icon size="18" @click="onClickDelete">{{ iconDelete }}</v-icon>
        </v-btn>
        <v-btn icon class="mr-1" @click="onClickEdit">
          <v-icon size="18">{{ iconEdit }}</v-icon>
        </v-btn>
      </div>
      <!-- <v-btn icon class="heart"> -->
      <v-icon
        class="mr-3 mt-1"
        size="18"
        :color="iconHeartColor"
        @click="onClickIconHeart"
      >{{ iconHeart }}</v-icon>
      <!-- </v-btn> -->
    </div>
    <PlateEditView ref="plateEditor" :plate="plate" />
    <PlateDeleteView ref="plateDelete" @deletePlateEvent="deletePlateEvent" :plate="plate" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { icon } from "@/config/icon";
import * as plateApi from "@/api/plate.ts";
import PlateEditView from "@/views/plate/components/edit.vue";
import PlateDeleteView from "@/views/plate/components/delete.vue";

@Component({
  components: {
    PlateEditView,
    PlateDeleteView
  }
})
export default class PlateView extends Vue {
  iconEdit = icon.mdiPencil;
  iconHeart = icon.mdiHeart;
  iconDelete = icon.mdiDelete;
  iconShoping = icon.mdiCart;

  @Prop() plate!: plateApi.PlateParam;
  @Prop() index!: number;

  get iconHeartColor() {
    return this.plate.isFavorite ? "blue" : "grey";
  }

  onClickEdit() {
    let ref: any = this.$refs.plateEditor;
    ref.isShow = true;
  }

  onClickDelete() {
    let ref: any = this.$refs.plateDelete;
    ref.isShow = true;
  }

  onClickIconHeart() {
    this.plate.isFavorite = !this.plate.isFavorite;
    if (this.plate.plateId !== undefined)
      plateApi.update(this.plate.plateId, this.plate);
  }

  onClickBuy() {
    window.open(this.plate.buyUrl);
  }

  deletePlateEvent() {
    console.log(this.plate.plateId);
    this.$emit("deletePlateEvent", this.index);
  }

  mounted() {}
  create() {}
}
</script>

<style lang="scss" scoped>
.plate-container {
  width: 90%;
  max-width: 350px;
  display: flex;
  justify-content: center;

  .plate-card {
    position: relative;
    width: 100%;
    background-color: white;
    border: #e0e0e0 1px solid;
    border-radius: 6px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    display: flex;
    // background-color: red;
    .left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;

      .plate-image img {
        position: relative;
        width: 120px;
        height: 80px;
        border-radius: 3px;
        border: #f3f3f3 1px solid;
        top: 5px;
      }
      .plate-name {
        display: flex;
        position: relative;
        text-align: center;
        justify-content: center;
      }
    }

    .plate-info {
      flex: 1;
      height: 100%;
      position: relative;
      .param {
        display: flex;
        // margin-top: 3px;
        .header {
          width: 40px;
          text-align: right;
          margin-right: 10px;
        }
      }
    }
    .icon-p {
      position: absolute;
      width: fit-content;
      right: 10px;
      bottom: 6px;
    }
    .heart {
      position: absolute;
      right: 15px;
      top: 8px;
    }
  }
}
</style>
