<template>
  <div class="scan-card-container">
    <div class="scan-card mx-auto">
      <div class="thumb">
        <img
          src="http://101.133.136.44/data/Scan00005/0001/S-20200306202136634.jpg"
        />
      </div>
      <v-divider class="mt-0"></v-divider>
      <div class="scan-title">
        <v-icon size="16" color="blue" class="icon">{{ iconManual }}</v-icon>
        <div class="text--black caption ml-1">心肌细胞测试</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { icon } from '@/config/icon';

@Component
export default class UserinfoCardView extends Vue {
  iconFolder = icon.mdiFolder;
  iconAccountEdit = icon.mdiAccountEdit;
  iconDelete = icon.mdiDelete;
  iconManual = icon.mdiAlphaM;
  iconAuto = icon.mdiAlphaA;
  mounted() {}
  create() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.scan-card-container {
  width: 100%;
  .scan-card {
    position: relative;
    width: 165px;
    border: #e0e0e0 1px solid;
    border-radius: 6px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    height: 215px;
    // display: flex;
    // flex-direction: column;
    // align-content: center;
    // align-items: center;
    // justify-content: center;
    .thumb img {
      // display: inline;
      width: 150px;
      margin-top: 22px;
      border-radius: 4px;
      margin-left: 50%;
      transform: translateX(-50%);
    }
    .scan-title {
      // background-color: red;
      position: relative;
      margin-left: 20px;
      .icon {
        position: absolute;
        left: -12px;
        top: 3px;
      }
    }
  }
  .opt-icon {
    position: absolute;

    right: 20px;
    bottom: 5px;
  }
}
</style>
