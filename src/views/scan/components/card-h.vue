<template>
  <div class="scan-card-container">
    <div class="scan-card mx-auto px-4 py-4">
      <div class="scan-info">
        <div class="black--text body-1" @click="openEditDialog">{{ scan.cellName}}</div>
        <div class="sub-info-title grey--text body-2">
          <v-avatar size="18">
            <img :src="scan.userAvatarUrl" :alt="scan.userName" />
          </v-avatar>
          <div class="overline grey--text ml-1">{{ scan.userName }}</div>
          <v-icon size="16" color="grey" class="ml-8">
            {{
            iconTime
            }}
          </v-icon>
          <div class="caption grey--text">{{ timeGap }}</div>
        </div>
        <div
          class="caption grey--text scan-comment my-2 mr-2"
          @click="openEditDialog"
        >{{ scan.comment }}</div>
        <div class="info-bottom">
          <div class="mt-2 info-tip px-2">
            <div v-if="scan.isManual">
              <v-icon size="16" color="green">{{ iconManual }}</v-icon>
            </div>
            <div v-else>
              <v-icon size="16" color="red">{{ iconAuto }}</v-icon>
            </div>
            <div class="caption grey--text ml-2">{{ scan.plateName }}</div>
          </div>
          <div class="opt-icon mr-0">
            <!-- <v-btn icon class="mr-2"> -->
            <v-icon
              class="mr-2"
              size="20"
              :color="iconHeartColor"
              @click="onClickIconHeart"
            >{{ iconHeart }}</v-icon>
            <!-- </v-btn> -->
            <v-btn icon class="mr-2">
              <v-icon size="20" color="grey">{{ iconMore }}</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
      <div class="thumb mr-2 my-auto">
        <v-badge
          offset-x="15px"
          offset-y="6px"
          color="blue"
          :content="scan.imageNum"
          class="thumb-badge"
        >
          <img :src="baseUrl + scan.thumbImageUrl" />
        </v-badge>
      </div>
    </div>
    <v-dialog v-model="isDialogShow" max-width="300">
      <v-card>
        <v-card-title class="headline">信息编辑</v-card-title>
        <v-card-text>
          <v-text-field v-model="cellName" label="观测对象" placeholder=" " required width="90%"></v-text-field>
          <v-text-field v-model="comment" label="备注" placeholder=" " required width="90%"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="isDialogShow = false">取消</v-btn>
          <v-btn color="primary darken-1" text @click="closeEditDialog">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { icon } from "@/config/icon";
// import { ScanViewData } from "@/ts/modules/Scan";
import * as scanApi from "@/api/scan.ts";
import { imageDataBaseUrl } from "@/config/index.ts";
import { getTimeGap } from "@/ts/common.ts";

@Component
export default class UserinfoCardView extends Vue {
  iconFolder = icon.mdiFolder;
  iconAccountEdit = icon.mdiAccountEdit;
  iconDelete = icon.mdiDelete;
  iconManual = icon.mdiAlphaM;
  iconAuto = icon.mdiAlphaA;
  iconTime = icon.mdiClock;

  iconHeart = icon.mdiHeart;
  iconShare = icon.mdiShare;
  iconDownload = icon.mdiDownload;
  iconMore = icon.mdiDotsHorizontal;

  baseUrl = imageDataBaseUrl;
  isDialogShow = false;
  cellName = "";
  comment = "";

  @Prop() scan!: scanApi.ScanParam;

  get iconHeartColor() {
    return this.scan.isFavorite ? "blue" : "grey";
  }

  get timeGap() {
    if (this.scan) {
      return getTimeGap(parseFloat(this.scan.createTime));
    } else return "";
  }

  onClickIconHeart() {
    this.scan.isFavorite = !this.scan.isFavorite;
    scanApi.update(this.scan.scanId, this.scan);
  }

  openEditDialog() {
    this.isDialogShow = true;
  }

  closeEditDialog() {
    this.isDialogShow = false;
    this.scan.cellName = this.cellName;
    this.scan.comment = this.comment;
    scanApi.update(this.scan.scanId, this.scan);
  }

  mounted() {
    this.cellName = this.scan.cellName;
    this.comment = this.scan.comment;
  }
  create() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.scan-card-container {
  width: 100%;

  .scan-card {
    position: relative;
    background-color: #fff;
    width: 95%;
    max-width: 400px;
    border: #e0e0e0 1px solid;
    border-radius: 6px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    // height: 180px;
    display: flex;
    // flex-direction: column;
    // align-content: center;
    // align-items: center;
    // justify-content: center;
    .scan-info {
      // background-color: red;
      position: relative;
      flex: 1;
      .sub-info-title {
        display: flex;
        // align-content: center;
        align-items: center;
      }
      .scan-comment {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .info-bottom {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        .info-tip {
          // background-color: yellow;
          display: flex;
          align-items: center;
          height: 20px;
          background-color: rgba(0, 0, 0, 0.05);
          border-radius: 4px;
        }
        // .opt-icon {
        //   // background-color: blue;
        //   // margin-right: 0;
        // }
      }
    }
    .thumb img {
      width: 120px;
      border-radius: 4px;
    }
  }
}
</style>
