<template>
  <v-app>
    <div class="top-wrap">
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// import screenfull from 'screenfull';

@Component({
  components: {}
})
export default class App extends Vue {
  mounted() {
    // if (document) let id = document.getElementById('myAnchor');
    // if (id)
    //   id.addEventListener('click', function(event) {
    //     event.preventDefault();
    //   });
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.top-wrap {
  background-color: #f7f7f7;
  height: 100%;
}
</style>
