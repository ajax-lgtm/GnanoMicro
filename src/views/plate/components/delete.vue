<template>
  <div class="delete-wrap">
    <v-row justify="center">
      <v-dialog v-model="isShow" persistent max-width="350px">
        <v-card>
          <v-card-title>
            <span class="title">您确定要删除本容器吗？</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" class="py-1">
                  <v-text-field dense label="密码" type="password" required></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <!-- <v-spacer></v-spacer> -->
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

  mounted() {
  }
  create() {}

  async onOk() {
    this.isShow = false;
    if (this.plate.plateId) {
      this.$emit("deletePlateEvent");
      //   let r = await plateApi.del(this.plate.plateId);
      //   if (r.message) {
      //     if (r.message.msg === "deleteSuccess") {
      //       this.$emit("deletePlateEvent", this.plate.plateId);
      //     }
      //   }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.delete-wrap {
  // background-color: red;
}
</style>
