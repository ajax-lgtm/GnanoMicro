<template>
  <div class="create-plate-container"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { icon } from '@/config/icon';

@Component
export default class CreatePlateView extends Vue {
  mounted() {}
  create() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.create-plate-container {
  background-color: red;
}
</style>
