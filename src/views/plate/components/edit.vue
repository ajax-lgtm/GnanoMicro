<template>
  <div class="edit-wrap">
    <v-row justify="center">
      <v-dialog v-model="isShow" persistent max-width="350px">
        <v-card>
          <v-card-title>
            <span class="title">容器信息编辑</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" class="py-1">
                  <v-autocomplete
                    dense
                    :items="defaultPlateType"
                    v-model="plate.plateName"
                    label="容器类型"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" class="py-1">
                  <v-text-field dense label="厂商" v-model="plate.company" required></v-text-field>
                </v-col>
                <v-col cols="12" class="py-1">
                  <v-text-field dense label="型号" v-model="plate.partNum" required></v-text-field>
                </v-col>
                <v-col cols="12" class="py-1">
                  <v-text-field dense label="备注" v-model="plate.comment"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="isShow = false">取消</v-btn>
            <v-btn color="blue darken-1" text @click="onOk">确定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import * as plateApi from "@/api/plate.ts";
import { defaultPlateType } from "@/config/index.ts";

@Component({
  components: {}
})
export default class CreateScanView extends Vue {
  isShow = false;
  defaultPlateType = defaultPlateType;

  @Prop() plate!: plateApi.PlateParam;

  mounted() {}
  create() {}

  onOk() {
    this.isShow = false;
    if (this.plate.plateId) plateApi.update(this.plate.plateId, this.plate);
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.edit-wrap {
  // background-color: red;
}
</style>
