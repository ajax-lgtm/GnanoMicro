<template>
  <div class="top" v-show="isShow">
    <div class="top-bar">
      <v-app-bar dense dark color="rgba(0, 0, 0, 0.2)" flat>
        <v-btn icon @click="goBack">
          <v-icon>{{ icon.mdiArrowLeft }}</v-icon>
        </v-btn>
        <div class="title-container">
          <div class="title" @click.stop="dialog = true">
            <v-icon class="icon-plate">{{ icon.mdiPlate }}</v-icon>
            <div @click="editComent">
              <v-toolbar-title style="float:left;">{{
                scanComment
              }}</v-toolbar-title>
              <v-icon color="orange" class="icon-edit">{{
                icon.mdiPencil
              }}</v-icon>
            </div>
          </div>
        </div>

        <v-menu left bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>{{ icon.mdiCogs }}</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="n in 5" :key="n" @click="() => {}">
              <v-list-item-title>Option {{ n }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </div>

    <!-- </v-row> -->
    <PlateParam ref="plateParam"></PlateParam>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import * as configIcon from "@/config/icon";
import pStore from "@/store/preview.ts";
import PlateParam from "@/views/scan/components/plate-param.vue";
// import { icon } from '@/config/icon';

@Component({
  components: {
    PlateParam
  }
})
export default class MapTopBar extends Vue {
  icon = configIcon.icon;

  dialog = false;
  scanComment: string = "心肌细胞96孔板";

  get isShow() {
    return !pStore.isAllBarHidden;
  }

  goBack() {
    this.$router.back();
    pStore.setState({
      isMainMapImageUpdate: false
    });
  }

  editComent() {
    // console.log('title clicked!');
    let ref: any = this.$refs.plateParam;
    ref.isShow = true;
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.top-bar {
  position: absolute;
  top: 0;
  z-index: 10;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  .title-container {
    width: 100%;
    .title {
      margin: 0 auto;
      width: fit-content;
      .icon-plate {
        position: relative;
        top: 3px;
        right: 10px;
        float: left;
      }
      .icon-edit {
        position: relative;
        top: 3px;
        left: 10px;
        float: left;
      }
    }
  }
}

.btn {
  width: fit-content;
  margin: 20px auto;
}
</style>
