<template>
  <div class="scan-param-container">
    <v-form v-model="valid">
      <div class="scan-param-card px-8 py-3" v-if="true">
        <v-row class="mx-0 mt-2">
          <v-text-field
            v-model="cellType"
            :counter="20"
            :rules="cellTypeRules"
            label="观测对象"
            width="90%"
            required
          ></v-text-field>
        </v-row>
        <v-row class="mx-0 mt-2">
          <v-text-field
            label="备注"
            placeholder=" "
            required
            width="90%"
          ></v-text-field>
        </v-row>
      </div>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { icon } from '@/config/icon';

@Component
export default class ScanParaView extends Vue {
  valid = true;
  cellType = "心肌细胞";
  get cellTypeRules() {
    let r = [
      (v: string) => !!v || "观测对象必须填写",
      (v: string) => (v.length && v.length <= 20) || "请输入小于20个字符"
    ];
    return r;
  }
  mounted() {}
  create() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.scan-param-container {
  // display: flex;
  width: 100%;
  // justify-content: center;
  .scan-param-card {
    width: 90%;
    max-width: 350px;
    margin-left: 50%;
    transform: translateX(-50%);
    // min-width: 250px;
    border: #e0e0e0 1px solid;
    border-radius: 6px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  }
  // background-color: red;
}
</style>
