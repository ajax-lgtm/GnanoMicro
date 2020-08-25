<template>
  <div class="setting-card-container">
    <div class="info-card mx-auto px-4 py-4 d-block mt-5">
      <div class="ml-3 d-flex align-center">
        <div>
          <v-icon size="24" color="blue" class="mr-1 mb-1">{{
            iconDevice
          }}</v-icon>
        </div>
        <div class="title">设备信息</div>
      </div>
      <div class="d-flex">
        <div class="param-title body-2 grey--text mt-1 text-no-wrap">
          <div class="my-2">型号</div>
          <div class="my-2">备注</div>
          <div class="my-2">序列号</div>
          <div class="my-2">出厂日期</div>
          <div class="my-2">软件版本</div>
          <div class="my-2">电池电量</div>
          <div class="my-2">数据统计</div>
          <div class="my-2">物镜倍数</div>
        </div>
        <div
          class="param-info ml-3 body-2 grey--text text--darken-3 my-1 text-no-wrap"
        >
          <div class="my-2">AI-Cell-2020</div>
          <div
            class="param-wrap d-flex flex-row my-2 mr-5 justify-space-between "
          >
            <div>上海实验室</div>
            <v-btn icon class="param-icon">
              <v-icon size="20" color="grey">{{ iconEdit }}</v-icon>
            </v-btn>
          </div>
          <div class="my-2">T8BPSXZ6</div>
          <div class="my-2">2020/03/20</div>
          <div class="my-2">2.04</div>
          <div class="my-2">80%</div>
          <div class="my-2">已用200G 占80%</div>
          <div class="my-2">10倍</div>
        </div>
      </div>
    </div>
    <div class="info-card mx-auto px-4 py-4 d-block mt-5">
      <div class="ml-3 d-flex align-center">
        <div>
          <v-icon size="24" color="green" class="mr-1 mb-1">{{
            iconNetwork
          }}</v-icon>
        </div>
        <div class="title">网络设置</div>
      </div>
      <div class="d-flex ">
        <div class="param-title body-2 grey--text mt-1 text-no-wrap">
          <div class="my-2">内网WIFI</div>
          <div class="my-2">内网WIFI密码</div>
          <div class="my-2">外网WIFI</div>
          <div class="my-2">外网WIFI密码</div>
          <div class="my-2">设备网址</div>
        </div>
        <div
          class="param ml-3 body-2 grey--text text--darken-3 my-1 text-no-wrap "
        >
          <div class="my-2">AI-CELL-T8BPSXZ6</div>
          <div class="d-flex flex-row my-2 mr-5 justify-space-between">
            <div>4HF7X5EPM</div>
            <div>ICON</div>
          </div>

          <div class="d-flex flex-row my-2 mr-5 justify-space-between">
            <div>DUDUFAN</div>
            <div>ICON</div>
          </div>

          <div class="d-flex flex-row my-2 mr-5 justify-space-between">
            <div>331331331</div>
            <div>ICON</div>
          </div>

          <div class="my-2 caption">http://m.gnano.cc/T8BPSXZ6</div>
        </div>
      </div>
      <div class="mx-auto qrcode">
        <canvas id="canvas"></canvas>
        <!-- afad -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { icon } from '@/config/icon';

@Component
export default class SettingCardView extends Vue {
  iconEdit = icon.mdiFileEdit;
  iconDevice = icon.mdiDevices;
  iconNetwork = icon.mdiNetwork;
  mounted() {
    let QRCode = require('qrcode');
    let canvas = document.getElementById('canvas');
    QRCode.toCanvas(canvas, 'http://m.gnano.cc/T8BPSXZ6');
  }
  create() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.setting-card-container {
  padding-top: 40px;
  padding-bottom: 60px;
  background-color: #f7f7f7;

  .info-card {
    position: relative;
    max-width: 350px;
    border: #e0e0e0 1px solid;
    border-radius: 6px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    display: flex;
    background-color: #fff;
  }
  .param-title {
    width: 35%;
    text-align: right;
  }
  .param-info {
    flex: 1;
  }
  .param-wrap {
    position: relative;
  }
  .qrcode {
    width: fit-content;
  }
  .param-icon {
    position: absolute;
    right: 20px;
    bottom: -6px;
  }
}
</style>
